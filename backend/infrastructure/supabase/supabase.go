package supabase

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/supabase-community/supabase-go"
)

func NewSupabaseClient() *supabase.Client {
	// .envの確認
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables")
	}

	// 環境変数の読み込み
	API_URL := os.Getenv("SUPABASE_URL")
	API_KEY := os.Getenv("SUPABASE_API_KEY")

	if API_URL == "" || API_KEY == "" {
		log.Fatal("SUPABASE_URL or SUPABASE_API_KEY is not set")
	}

	// supabaseClientの作成
	client, err := supabase.NewClient(API_URL, API_KEY, &supabase.ClientOptions{})
	if err != nil {
		log.Fatalf("cannot initalize client: %v", err)
	}
	return client
}
