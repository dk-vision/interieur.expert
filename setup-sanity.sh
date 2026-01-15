#!/bin/bash

# interieur.expert Sanity Setup Script

echo "🎨 interieur.expert - Sanity CMS Setup"
echo "======================================"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from example..."
    cp .env.local.example .env.local
    echo "✅ .env.local created"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env.local and add your Sanity credentials!"
    echo "   1. Go to https://sanity.io and create a project"
    echo "   2. Copy your Project ID and add to NEXT_PUBLIC_SANITY_PROJECT_ID"
    echo "   3. Create an API token (Viewer + Editor) and add to SANITY_API_TOKEN"
    echo "   4. Generate random secrets for DRAFT_SECRET and REVALIDATE_SECRET"
    echo ""
    read -p "Press enter when you've configured .env.local..."
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "📦 Installing dependencies..."
pnpm install

echo ""
echo "🚀 Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Run the Next.js app:    pnpm dev"
echo "  2. Run Sanity Studio:      pnpm studio"
echo "  3. Add content at:         http://localhost:3000/studio"
echo ""
echo "📖 Full documentation: README-SANITY.md"
