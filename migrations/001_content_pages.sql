-- ============================================
-- CONTENT PAGES TABLE (CMS for Dynamic Pages)
-- ============================================
-- This table stores all dynamic content pages like "Shipping Policy", "About Us", etc.
-- Pages can be created via Admin Panel without coding

CREATE TABLE IF NOT EXISTS content_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL, -- URL slug (e.g., "shipping-policy", "about-us")
    title TEXT NOT NULL,
    content TEXT NOT NULL, -- HTML/Markdown content
    is_published BOOLEAN DEFAULT false,
    
    -- SEO Metadata
    meta_description TEXT,
    meta_keywords TEXT,
    og_image TEXT, -- Open Graph image URL
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default content pages
INSERT INTO content_pages (slug, title, content, is_published, meta_description) VALUES
(
    'shipping-policy',
    'Shipping Policy',
    '<h1>Shipping Policy</h1>
    <p>We offer free shipping on all prepaid orders across India.</p>
    <h2>Delivery Time</h2>
    <p>Standard delivery takes 5-7 business days.</p>
    <h2>COD Available</h2>
    <p>Cash on Delivery option available for select pincodes.</p>',
    true,
    'Intru Clothing shipping policy - Free shipping on prepaid orders'
),
(
    'return-policy',
    'Return & Exchange Policy',
    '<h1>Return & Exchange Policy</h1>
    <p>We accept returns and exchanges within 7 days of delivery.</p>
    <h2>Conditions</h2>
    <ul>
        <li>Product must be unused and in original packaging</li>
        <li>Tags must be intact</li>
        <li>Return shipping costs are borne by customer</li>
    </ul>',
    true,
    'Intru Clothing return and exchange policy'
),
(
    'about-us',
    'About Intru',
    '<h1>About Intru</h1>
    <p>Built from scratch with a shared love for minimalism & everyday style.</p>
    <p>We don&apos;t follow trends. We create the chaos you want to wear.</p>
    <h2>Our Philosophy</h2>
    <p>100% Cotton. 0% Bullsh*t. Every piece is designed in India with heavyweight 240GSM fabric.</p>',
    true,
    'About Intru - Indian streetwear brand'
),
(
    'privacy-policy',
    'Privacy Policy',
    '<h1>Privacy Policy</h1>
    <p>Your privacy is important to us. This policy explains how we collect and use your data.</p>
    <h2>Information We Collect</h2>
    <p>We collect information you provide when placing an order.</p>',
    true,
    'Intru Clothing privacy policy'
),
(
    'terms-of-service',
    'Terms of Service',
    '<h1>Terms of Service</h1>
    <p>By using our website, you agree to these terms.</p>',
    true,
    'Intru Clothing terms of service'
)
ON CONFLICT (slug) DO NOTHING;

-- Create index for faster slug lookups
CREATE INDEX IF NOT EXISTS idx_content_pages_slug ON content_pages(slug);
CREATE INDEX IF NOT EXISTS idx_content_pages_published ON content_pages(is_published);

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_content_pages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_content_pages_timestamp
    BEFORE UPDATE ON content_pages
    FOR EACH ROW
    EXECUTE FUNCTION update_content_pages_updated_at();

-- RLS Policies
ALTER TABLE content_pages ENABLE ROW LEVEL SECURITY;

-- Public can view published pages
CREATE POLICY "Public can view published pages" ON content_pages
    FOR SELECT USING (is_published = true);

-- Service role can manage all pages
CREATE POLICY "Service role can manage all pages" ON content_pages
    FOR ALL USING (
        current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
        OR auth.uid() IS NOT NULL
    );

COMMENT ON TABLE content_pages IS 'Dynamic CMS pages created via Admin Panel';
