#!/bin/bash

#############################################
# Intru E-Commerce - Production Deployment
# Repository: https://github.com/surisettidev/intruld
# Branch: main
#############################################

set -e  # Exit on any error

echo "🚀 Intru E-Commerce - Production Deployment Script"
echo "=================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

#############################################
# Step 1: Verify Git Repository
#############################################
echo "Step 1: Verifying Git repository..."

if [ ! -d ".git" ]; then
    print_error "Not a git repository. Please run this script from the project root."
    exit 1
fi

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
print_info "Current branch: $CURRENT_BRANCH"

if [ "$CURRENT_BRANCH" != "main" ]; then
    print_info "Not on main branch. Switching to main..."
    git checkout main || {
        print_error "Failed to switch to main branch"
        exit 1
    }
fi

print_success "Git repository verified"
echo ""

#############################################
# Step 2: Check for Uncommitted Changes
#############################################
echo "Step 2: Checking for uncommitted changes..."

if [ -n "$(git status --porcelain)" ]; then
    print_info "Found uncommitted changes. Staging all files..."
    
    # Show what will be committed
    echo ""
    echo "Files to be committed:"
    git status --short
    echo ""
    
    # Stage all changes
    git add -A
    
    # Prompt for commit message
    echo "Enter commit message (or press Enter for default):"
    read COMMIT_MESSAGE
    
    if [ -z "$COMMIT_MESSAGE" ]; then
        COMMIT_MESSAGE="Production refactor: Add AI integration, dynamic CMS, and security improvements"
    fi
    
    # Commit changes
    git commit -m "$COMMIT_MESSAGE" || {
        print_error "Failed to commit changes"
        exit 1
    }
    
    print_success "Changes committed successfully"
else
    print_success "No uncommitted changes found"
fi

echo ""

#############################################
# Step 3: Pull Latest Changes (Optional)
#############################################
echo "Step 3: Checking remote repository..."

# Fetch latest from remote
git fetch origin main || {
    print_info "Failed to fetch from remote (might be first push)"
}

# Check if remote is ahead
BEHIND_COUNT=$(git rev-list --count HEAD..origin/main 2>/dev/null || echo "0")

if [ "$BEHIND_COUNT" -gt "0" ]; then
    print_info "Remote is $BEHIND_COUNT commits ahead. Pulling latest changes..."
    git pull origin main --rebase || {
        print_error "Failed to pull changes. Please resolve conflicts manually."
        exit 1
    }
    print_success "Pulled latest changes"
else
    print_success "Local repository is up to date"
fi

echo ""

#############################################
# Step 4: Push to GitHub
#############################################
echo "Step 4: Pushing to GitHub..."

git push origin main || {
    print_error "Failed to push to GitHub. Check your credentials and network connection."
    exit 1
}

print_success "Successfully pushed to GitHub"
echo ""

#############################################
# Step 5: Display Summary
#############################################
echo "Step 5: Deployment Summary"
echo "=========================="
echo ""

# Get latest commit info
COMMIT_HASH=$(git rev-parse --short HEAD)
COMMIT_MESSAGE=$(git log -1 --pretty=%B)
COMMIT_DATE=$(git log -1 --pretty=%cd)

echo "Repository: https://github.com/surisettidev/intruld"
echo "Branch: main"
echo "Latest Commit: $COMMIT_HASH"
echo "Commit Message: $COMMIT_MESSAGE"
echo "Commit Date: $COMMIT_DATE"
echo ""

print_success "Deployment to GitHub completed successfully!"
echo ""

#############################################
# Step 6: Cloudflare Pages Instructions
#############################################
echo "Step 6: Cloudflare Pages Deployment"
echo "===================================="
echo ""

print_info "Your code has been pushed to GitHub. Now deploy to Cloudflare Pages:"
echo ""
echo "Option 1: Automatic Deployment (Recommended)"
echo "  1. Cloudflare Pages is connected to your GitHub repository"
echo "  2. The deployment will start automatically"
echo "  3. Check deployment status at: https://dash.cloudflare.com/"
echo ""
echo "Option 2: Manual Deployment"
echo "  1. Run: npm run pages:build"
echo "  2. Run: wrangler pages deploy .vercel/output/static --project-name intruld"
echo ""

#############################################
# Step 7: Post-Deployment Checklist
#############################################
echo "Step 7: Post-Deployment Checklist"
echo "=================================="
echo ""

echo "[ ] 1. Verify Supabase database migration (001_content_pages.sql)"
echo "[ ] 2. Configure environment variables in Cloudflare Pages:"
echo "       - NEXT_PUBLIC_SUPABASE_URL"
echo "       - NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "       - SUPABASE_SERVICE_ROLE_KEY"
echo "       - ADMIN_SECRET_KEY (default: Kbssol@331)"
echo "       - GROK_API_KEY (optional, for AI features)"
echo "       - GEMINI_API_KEY (optional, for AI features)"
echo "       - RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET"
echo "       - NEXT_PUBLIC_APP_URL"
echo "[ ] 3. Test admin login at: https://your-domain.pages.dev/admin/login"
echo "[ ] 4. Test dynamic content pages at: https://your-domain.pages.dev/about"
echo "[ ] 5. Test AI generation (if API keys configured)"
echo "[ ] 6. Verify product pages load with correct metadata"
echo "[ ] 7. Test cart persistence across page reloads"
echo "[ ] 8. Test order creation flow"
echo ""

#############################################
# Step 8: Documentation Links
#############################################
echo "Step 8: Documentation"
echo "====================="
echo ""

echo "📚 Key Documentation Files:"
echo "  - REFACTOR_SUMMARY.md - Complete refactor documentation"
echo "  - README.md - Project overview"
echo "  - migrations/001_content_pages.sql - Database schema"
echo ""

echo "🔗 Important Links:"
echo "  - GitHub: https://github.com/surisettidev/intruld"
echo "  - Cloudflare Dashboard: https://dash.cloudflare.com/"
echo "  - Supabase Dashboard: https://app.supabase.com/"
echo ""

#############################################
# Success Message
#############################################
echo ""
echo "🎉 Deployment preparation complete!"
echo ""
print_success "Next steps:"
echo "  1. Wait for Cloudflare Pages auto-deployment"
echo "  2. Run database migrations in Supabase"
echo "  3. Configure environment variables"
echo "  4. Test all features"
echo ""
echo "For issues, check REFACTOR_SUMMARY.md for troubleshooting."
echo ""
