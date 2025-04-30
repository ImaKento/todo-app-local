package supabase

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/supabase-community/supabase-go"
)

func NewSupabaseClient() *supabase.Client {
	// .envの確認
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// 環境変数の読み込み
	API_URL := os.Getenv("SUPABASE_URL")
	API_KEY := os.Getenv("SUPABASE_API_KEY")

	// supabaseClientの作成
	client, err := supabase.NewClient(API_URL, API_KEY, &supabase.ClientOptions{})
	if err != nil {
		log.Fatalf("cannot initalize client: %v", err)
	}
	return client
}
