-- Adicionando novas colunas na tabela user_profiles para suportar os novos campos
ALTER TABLE betim_futebol.user_profiles 
ADD COLUMN IF NOT EXISTS birth_date DATE,
ADD COLUMN IF NOT EXISTS receive_news BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW();

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON betim_futebol.user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_membership ON betim_futebol.user_profiles(membership_type);
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at ON betim_futebol.user_profiles(created_at);

-- Comentários nas colunas para documentação
COMMENT ON COLUMN betim_futebol.user_profiles.birth_date IS 'Data de nascimento do usuário';
COMMENT ON COLUMN betim_futebol.user_profiles.receive_news IS 'Se o usuário aceita receber newsletter';
COMMENT ON COLUMN betim_futebol.user_profiles.created_at IS 'Data de criação da conta';
COMMENT ON COLUMN betim_futebol.user_profiles.updated_at IS 'Data da última atualização';
