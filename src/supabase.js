import { createClient } from "@supabase/supabase-js";

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://hypqsgzxqphuxjpqqtqa.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
