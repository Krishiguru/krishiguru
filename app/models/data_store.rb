class DataStore < ApplicationRecord
  scope :news, -> {where(:data_type => 'News')}
  scope :finance, -> {where(:data_type => 'Finance')}
  scope :market, -> {where(:data_type => 'Market')}
  scope :guides, -> {where(:data_type => 'Guide')}
  scope :blogs, -> {where(:data_type => 'Blog')}
end
