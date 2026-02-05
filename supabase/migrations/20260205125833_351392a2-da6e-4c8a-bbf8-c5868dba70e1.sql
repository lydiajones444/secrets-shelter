-- Create a table for storing API keys
CREATE TABLE public.api_keys (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  api_category TEXT NOT NULL CHECK (api_category IN ('API 1', 'API 2', 'API 3')),
  key_value TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;

-- For now, allow public read/write (since no auth is set up yet)
-- In production, you'd want to add user_id and proper policies
CREATE POLICY "Allow public read access to api_keys"
  ON public.api_keys FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert access to api_keys"
  ON public.api_keys FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public delete access to api_keys"
  ON public.api_keys FOR DELETE
  USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_api_keys_updated_at
  BEFORE UPDATE ON public.api_keys
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();