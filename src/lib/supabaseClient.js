import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ptrdhbrojodkfulupttw.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0cmRoYnJvam9ka2Z1bHVwdHR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5ODg0MjYsImV4cCI6MjA1MTU2NDQyNn0.heD10r98DzzH2nGjKO5eOPJHbifipQgYbO0kyqV40xQ'; // Replace with your actual public API key
export const supabase = createClient(supabaseUrl, supabaseKey);
