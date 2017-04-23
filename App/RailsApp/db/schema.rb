# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170423101616) do

  create_table "requests", force: :cascade do |t|
    t.datetime "start_time"
    t.string   "start_place"
    t.datetime "end_time"
    t.string   "end_place"
    t.text     "text"
    t.string   "image"
    t.string   "request_id"
    t.integer  "wishes_count"
    t.integer  "poster_id"
    t.integer  "helper_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["helper_id"], name: "index_requests_on_helper_id"
    t.index ["poster_id"], name: "index_requests_on_poster_id"
    t.index ["request_id"], name: "index_requests_on_request_id", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "username"
    t.text     "bio"
    t.string   "proPic"
    t.string   "mobileNum"
    t.integer  "mem"
    t.integer  "greyStars"
    t.integer  "yellowStars"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
