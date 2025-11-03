#!/bin/bash
# Munzur Psikoloji Kulübü - Sunucu Kurulum Scripti
# Bu scripti laptop sunucunuzda çalıştırın

set -e  # Hata olursa dur

echo "🚀 Munzur Psikoloji Kulübü - Sunucu Kurulumu"
echo "=============================================="

# Renk kodları
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Sistem güncellemesi
echo -e "${YELLOW}[1/6] Sistem güncelleniyor...${NC}"
sudo apt-get update -y
sudo apt-get upgrade -y

# 2. Docker kurulumu kontrolü
echo -e "${YELLOW}[2/6] Docker kontrol ediliyor...${NC}"
if ! command -v docker &> /dev/null; then
    echo "Docker yüklü değil, kuruluyor..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    echo -e "${GREEN}✓ Docker kuruldu${NC}"
else
    echo -e "${GREEN}✓ Docker zaten yüklü${NC}"
fi

# 3. Docker Compose kurulumu kontrolü
echo -e "${YELLOW}[3/6] Docker Compose kontrol ediliyor...${NC}"
if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose yüklü değil, kuruluyor..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo -e "${GREEN}✓ Docker Compose kuruldu${NC}"
else
    echo -e "${GREEN}✓ Docker Compose zaten yüklü${NC}"
fi

# 4. Proje dizini oluşturma
echo -e "${YELLOW}[4/6] Proje dizini oluşturuluyor...${NC}"
sudo mkdir -p /opt/munzur-psikoloji
sudo chown $USER:$USER /opt/munzur-psikoloji
cd /opt/munzur-psikoloji
echo -e "${GREEN}✓ Dizin oluşturuldu: /opt/munzur-psikoloji${NC}"

# 5. .env.production dosyası oluşturma
echo -e "${YELLOW}[5/6] .env.production dosyası oluşturuluyor...${NC}"
if [ ! -f .env.production ]; then
    cat > .env.production << 'EOF'
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://grpdehwhgjiadprkannw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdycGRlaHdoZ2ppYWRwcmthbm53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MzU1OTEsImV4cCI6MjA3NjExMTU5MX0.YLWU1LRV4DkPFrSaKjGMdXD3LBsmdQMhzmv90EN4LiU

# Database Configuration
DATABASE_URL="postgresql://postgres.grpdehwhgjiadprkannw:Ahmetmert65.@aws-1-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=10"
DIRECT_URL="postgresql://postgres:Ahmetmert65.@db.grpdehwhgjiadprkannw.supabase.co:5432/postgres"

# Application Configuration
NODE_ENV=production
NEXT_PUBLIC_APP_URL=http://100.124.34.126:3000
EOF
    echo -e "${GREEN}✓ .env.production oluşturuldu${NC}"
else
    echo -e "${GREEN}✓ .env.production zaten mevcut${NC}"
fi

# 6. SSH key oluşturma (GitHub Actions için)
echo -e "${YELLOW}[6/6] SSH key oluşturuluyor...${NC}"
if [ ! -f ~/.ssh/github_actions ]; then
    ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions -N ""
    cat ~/.ssh/github_actions.pub >> ~/.ssh/authorized_keys
    chmod 600 ~/.ssh/authorized_keys
    echo -e "${GREEN}✓ SSH key oluşturuldu${NC}"
else
    echo -e "${GREEN}✓ SSH key zaten mevcut${NC}"
fi

echo ""
echo "=============================================="
echo -e "${GREEN}✅ KURULUM TAMAMLANDI!${NC}"
echo "=============================================="
echo ""
echo "📝 SONRAKİ ADIMLAR:"
echo ""
echo "1. SSH Private Key'i GitHub'a ekleyin:"
echo "   cat ~/.ssh/github_actions"
echo ""
echo "2. docker-compose.yml dosyasını buraya kopyalayın:"
echo "   scp -P 5088 docker-compose.yml mert65@100.124.34.126:/opt/munzur-psikoloji/"
echo ""
echo "3. GitHub Secrets'a şunları ekleyin:"
echo "   SERVER_HOST=100.124.34.126"
echo "   SERVER_PORT=5088"
echo "   SERVER_USER=mert65"
echo "   SSH_PRIVATE_KEY=[yukarıdaki cat komutu çıktısı]"
echo ""
echo "4. İlk deployment'ı test edin:"
echo "   cd /opt/munzur-psikoloji"
echo "   docker-compose up -d"
echo ""
echo "5. Uygulamaya erişin:"
echo "   http://100.124.34.126:3000"
echo ""
echo "=============================================="
