import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://hypqsgzxqphuxjpqqtqa.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cHFzZ3p4cXBodXhqcHFxdHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIyOTg2OTgsImV4cCI6MjAxNzg3NDY5OH0.3WlvTdBujzeSISIpRFO4mQX_jjr-fTSqnDAM27OGuYc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
