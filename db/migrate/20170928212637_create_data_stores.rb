class CreateDataStores < ActiveRecord::Migration[5.1]
  def change
    create_table :data_stores do |t|
      t.string :data_type
      t.string :title
      t.string :sub_title
      t.text :peek
      t.text :content
      t.string :source

      t.timestamps
    end
  end
end
