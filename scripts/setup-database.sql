-- Criar schema principal se não existir
CREATE SCHEMA IF NOT EXISTS betim_futebol;

-- Tabela de usuários (complementar à users_sync do neon_auth)
CREATE TABLE IF NOT EXISTS betim_futebol.user_profiles (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  cpf TEXT,
  birth_date DATE,
  membership_type TEXT CHECK (membership_type IN ('none', 'mensal', 'trimestral', 'anual')),
  membership_expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS betim_futebol.products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  gender TEXT CHECK (gender IN ('masculino', 'feminino', 'infantil', 'unissex')),
  sizes TEXT[] DEFAULT ARRAY['P', 'M', 'G', 'GG'],
  colors TEXT[] DEFAULT ARRAY['azul', 'branco', 'vermelho'],
  image_url TEXT,
  stock INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de pedidos
CREATE TABLE IF NOT EXISTS betim_futebol.orders (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  discount DECIMAL(10,2) DEFAULT 0,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  status TEXT CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending',
  payment_method TEXT,
  shipping_address JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de itens do pedido
CREATE TABLE IF NOT EXISTS betim_futebol.order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES betim_futebol.orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES betim_futebol.products(id),
  quantity INTEGER NOT NULL,
  size TEXT,
  color TEXT,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL
);

-- Tabela de assinaturas de sócio torcedor
CREATE TABLE IF NOT EXISTS betim_futebol.memberships (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  plan_type TEXT CHECK (plan_type IN ('mensal', 'trimestral', 'anual')) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT CHECK (status IN ('active', 'expired', 'cancelled')) DEFAULT 'active',
  payment_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir produtos iniciais
INSERT INTO betim_futebol.products (name, description, price, category, gender, image_url) VALUES
('Camisa Titular 2024', 'Camisa oficial titular do Betim Futebol temporada 2024', 89.90, 'camisa', 'masculino', '/placeholder-20dw2.png'),
('Camisa Reserva 2024', 'Camisa oficial reserva do Betim Futebol temporada 2024', 89.90, 'camisa', 'masculino', '/placeholder-7zjoi.png'),
('Camisa Feminina 2024', 'Camisa oficial feminina do Betim Futebol temporada 2024', 79.90, 'camisa', 'feminino', '/placeholder-a8f4c.png'),
('Camisa Infantil 2024', 'Camisa oficial infantil do Betim Futebol temporada 2024', 59.90, 'camisa', 'infantil', '/placeholder-20dw2.png'),
('Agasalho Oficial', 'Agasalho oficial do Betim Futebol', 149.90, 'agasalho', 'unissex', '/placeholder-7zjoi.png'),
('Boné Oficial', 'Boné oficial do Betim Futebol', 39.90, 'acessorio', 'unissex', '/placeholder-a8f4c.png')
ON CONFLICT DO NOTHING;

-- Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON betim_futebol.user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON betim_futebol.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_memberships_user_id ON betim_futebol.memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON betim_futebol.products(category);
