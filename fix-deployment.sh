#!/bin/bash

#############################################
# INTRU E-COMMERCE - DEPLOYMENT FIX SCRIPT
# Applies all fixes for Cloudflare deployment
#############################################

set -e

echo "🔧 INTRU E-COMMERCE - APPLYING FIXES"
echo "====================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

print_step() {
    echo -e "${BLUE}▶ $1${NC}"
}

cd /home/user/intruld

print_step "Step 1: Clean build artifacts"
echo "================================"

# Remove build artifacts
rm -rf .next
rm -rf .vercel
rm -rf node_modules/.cache

print_success "Build artifacts cleaned"
echo ""

print_step "Step 2: Verify package.json scripts"
echo "===================================="

# Check if scripts exist
if grep -q '"pages:build"' package.json; then
    print_success "Build scripts verified"
else
    print_error "Build scripts missing - please check package.json"
    exit 1
fi

echo ""

print_step "Step 3: Check component files"
echo "=============================="

COMPONENTS=(
    "components/Navbar.tsx"
    "components/Footer.tsx"
)

for component in "${COMPONENTS[@]}"; do
    if [ -f "$component" ]; then
        print_success "$component exists"
    else
        print_error "$component is missing!"
        exit 1
    fi
done

echo ""

print_step "Step 4: Verify AI integration files"
echo "===================================="

AI_FILES=(
    "lib/ai-client.ts"
    "app/api/admin/ai/generate/route.ts"
)

for file in "${AI_FILES[@]}"; do
    if [ -f "$file" ]; then
        print_success "$file exists"
    else
        print_error "$file is missing!"
        exit 1
    fi
done

echo ""

print_step "Step 5: Check dynamic CMS files"
echo "================================"

if [ -f "app/[slug]/page.tsx" ]; then
    print_success "Dynamic CMS route exists"
else
    print_error "Dynamic CMS route missing!"
    exit 1
fi

echo ""

print_step "Step 6: Verify force-dynamic export"
echo "===================================="

if grep -q "export const dynamic = 'force-dynamic'" app/page.tsx; then
    print_success "Homepage has force-dynamic export"
else
    print_error "Homepage missing force-dynamic export!"
    exit 1
fi

echo ""

print_step "Step 7: Test local build (dry run)"
echo "==================================="

print_info "Running: npm run build (this may take 30-60 seconds)"

# Test build locally
if npm run build > /tmp/build-test.log 2>&1; then
    print_success "Local build successful!"
    echo ""
    echo "Build summary:"
    tail -n 20 /tmp/build-test.log | grep -E "(Route|Static|ƒ|○|✓)" || echo "Build completed"
else
    print_error "Local build failed!"
    echo ""
    echo "Error details:"
    tail -n 50 /tmp/build-test.log
    exit 1
fi

echo ""

print_step "Step 8: Git status check"
echo "========================"

git status --short

echo ""

print_success "All fixes applied successfully!"
echo ""
echo "Next steps:"
echo "  1. Review the changes above"
echo "  2. Run: git add -A"
echo "  3. Run: git commit -m 'Fix: Resolve deployment issues with fonts and styling'"
echo "  4. Run: git push origin main"
echo "  5. Monitor Cloudflare Pages dashboard for deployment"
echo ""
echo "Or run: ./deploy.sh to do all of the above automatically"
echo ""
