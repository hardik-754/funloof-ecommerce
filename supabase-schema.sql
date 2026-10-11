-- ==============================================================================
-- FUNLOOF PRODUCTION DATABASE SCHEMA (SUPABASE / POSTGRESQL)
-- Premium Eco-Friendly Educational Wooden Toys
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    tagline TEXT,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    compare_at_price DECIMAL(10, 2),
    images TEXT[] NOT NULL DEFAULT '{}',
    age_group VARCHAR(20) NOT NULL CHECK (age_group IN ('0-12m', '1-3y', '3-5y', '5y+')),
    age_label VARCHAR(100) NOT NULL,
    skills TEXT[] NOT NULL DEFAULT '{}',
    materials TEXT[] NOT NULL DEFAULT '{}',
    safety_certifications TEXT[] NOT NULL DEFAULT '{}',
    stock INTEGER NOT NULL DEFAULT 0,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_best_seller BOOLEAN NOT NULL DEFAULT FALSE,
    rating DECIMAL(3, 2) DEFAULT 5.0,
    review_count INTEGER DEFAULT 0,
    why_parents_love_it TEXT[] NOT NULL DEFAULT '{}',
    dimensions VARCHAR(255),
    weight VARCHAR(100),
    care_instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    shipping_address_line1 TEXT NOT NULL,
    shipping_address_line2 TEXT,
    shipping_city VARCHAR(100) NOT NULL,
    shipping_state VARCHAR(100) NOT NULL,
    shipping_postal_code VARCHAR(20) NOT NULL,
    shipping_country VARCHAR(100) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) DEFAULT 0,
    shipping_cost DECIMAL(10, 2) DEFAULT 0,
    tax DECIMAL(10, 2) DEFAULT 0,
    total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    payment_method VARCHAR(100) DEFAULT 'Credit Card (Stripe)',
    tracking_number VARCHAR(255),
    carrier VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    product_name VARCHAR(255) NOT NULL,
    product_image TEXT,
    price DECIMAL(10, 2) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0)
);

-- 5. CUSTOMERS CRM TABLE
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    city VARCHAR(255),
    total_orders INTEGER NOT NULL DEFAULT 1,
    total_spent DECIMAL(10, 2) NOT NULL DEFAULT 0,
    last_order_date DATE DEFAULT CURRENT_DATE,
    is_vip BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. BLOG POSTS (CMS) TABLE
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    author_name VARCHAR(255) NOT NULL,
    author_role VARCHAR(255) NOT NULL,
    author_avatar TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    read_time VARCHAR(50) NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. SITE SETTINGS (CMS) TABLE
CREATE TABLE IF NOT EXISTS site_settings (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'current_settings',
    announcement_text TEXT NOT NULL,
    announcement_link VARCHAR(255) NOT NULL,
    hero_headline TEXT NOT NULL,
    hero_subheadline TEXT NOT NULL,
    hero_badge VARCHAR(255) NOT NULL,
    hero_image TEXT NOT NULL,
    hero_cta_text VARCHAR(100) NOT NULL,
    hero_cta_link VARCHAR(255) NOT NULL,
    free_shipping_threshold DECIMAL(10, 2) NOT NULL DEFAULT 50,
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    currency_symbol VARCHAR(5) NOT NULL DEFAULT '$',
    contact_email VARCHAR(255) NOT NULL,
    instagram_handle VARCHAR(100) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public can read products, blog posts, and site settings
CREATE POLICY "Public Read Products" ON products FOR SELECT USING (true);
CREATE POLICY "Public Read Blog" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public Read Settings" ON site_settings FOR SELECT USING (true);

-- Authenticated Admin Full Access
CREATE POLICY "Admin Full Products" ON products FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Orders" ON orders FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Order Items" ON order_items FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Customers" ON customers FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Blog" ON blog_posts FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Settings" ON site_settings FOR ALL TO authenticated USING (true);
