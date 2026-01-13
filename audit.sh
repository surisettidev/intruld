#!/bin/bash

#############################################
# INTRU E-COMMERCE - EMERGENCY FIX SCRIPT
# Fixes deployment issues and missing components
#############################################

set -e

echo "🚨 INTRU E-COMMERCE - EMERGENCY FIX"
echo "===================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
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

cd /home/user/intruld

echo "Phase 1: Checking for zombie files..."
echo "======================================"

# Check for duplicate route files
ZOMBIE_FILES=(
    "app/api/admin/pages/[id]/route.backup.ts"
    "app/api/admin/pages/route.backup.ts"
)

for file in "${ZOMBIE_FILES[@]}"; do
    if [ -f "$file" ]; then
        print_info "Removing zombie file: $file"
        rm -f "$file"
    fi
done

print_success "Zombie cleanup complete"
echo ""

echo "Phase 2: Verifying critical files..."
echo "======================================"

CRITICAL_FILES=(
    "components/Navbar.tsx"
    "components/Footer.tsx"
    "lib/ai-client.ts"
    "app/[slug]/page.tsx"
    "app/api/admin/ai/generate/route.ts"
    "app/admin/layout.tsx"
    "app/page.tsx"
    "app/layout.tsx"
    "app/globals.css"
)

MISSING_FILES=()

for file in "${CRITICAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        print_success "EXISTS: $file"
    else
        print_error "MISSING: $file"
        MISSING_FILES+=("$file")
    fi
done

if [ ${#MISSING_FILES[@]} -eq 0 ]; then
    print_success "All critical files exist"
else
    print_error "Missing ${#MISSING_FILES[@]} files - will need manual creation"
fi

echo ""

echo "Phase 3: Checking configuration..."
echo "==================================="

# Check package.json
if grep -q '"pages:build"' package.json; then
    print_success "Build script configured"
else
    print_error "Build script missing in package.json"
fi

# Check for Supabase env vars (will check .env.local)
if [ -f ".env.local" ]; then
    if grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local; then
        print_success "Supabase environment variables configured"
    else
        print_error "Supabase environment variables missing"
    fi
else
    print_info ".env.local not found (OK for Cloudflare deployment)"
fi

echo ""

echo "Phase 4: Testing imports..."
echo "============================"

# Check if Navbar is imported correctly
if grep -q "from '@/components/Navbar'" app/page.tsx; then
    print_success "Navbar import found"
fi

# Check if Footer is imported correctly  
if grep -q "from '@/components/Footer'" app/page.tsx; then
    print_success "Footer import found"
fi

echo ""

echo "Phase 5: Git status..."
echo "======================"

git status --short

echo ""
echo "✅ Audit complete!"
echo ""
echo "Next steps:"
echo "1. Review any missing files above"
echo "2. Run: ./fix-deployment.sh (to apply fixes)"
echo "3. Run: ./deploy.sh (to push to GitHub)"
echo ""
