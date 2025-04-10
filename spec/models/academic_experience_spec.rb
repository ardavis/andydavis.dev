require 'rails_helper'

RSpec.describe AcademicExperience, type: :model do
  subject { build(:academic_experience) }

  describe 'institution' do
    it 'cannot be blank' do
      subject.institution = nil
      expect(subject).to_not be_valid
      expect(subject.errors[:institution]).to include "can't be blank"
    end
  end

  describe 'degree' do
    it 'cannot be blank' do
      subject.degree = nil
      expect(subject).to_not be_valid
      expect(subject.errors[:degree]).to include "can't be blank"
    end
  end

  describe 'start_date' do
    it 'cannot be blank' do
      subject.start_date = nil
      expect(subject).to_not be_valid
      expect(subject.errors[:start_date]).to include "can't be blank"
    end
  end

  describe 'end_date' do
    it 'cannot be blank' do
      subject.end_date = nil
      expect(subject).to_not be_valid
      expect(subject.errors[:end_date]).to include "can't be blank"
    end

    it 'must be greater than the start date' do
      date = Time.now
      subject.start_date = date
      subject.end_date = date
      expect(subject).to_not be_valid
      expect(subject.errors[:end_date]).to include "must be greater than #{date}"

      subject.end_date = 1.hour.from_now
      expect(subject).to be_valid
    end
  end

  describe 'description' do
    it 'cannot be blank' do
      subject.description = nil
      expect(subject).to_not be_valid
      expect(subject.errors[:description]).to include "can't be blank"
    end
  end

  describe 'date precision' do
    it 'defaults to day' do
      expect(subject.date_precision).to eq "day"
    end

    it 'only allows a value of day/month/year' do
      expect { subject.date_precision = 'other' }.to raise_error ArgumentError
      expect { subject.date_precision = 'day' }.to_not raise_error
      expect { subject.date_precision = 'month' }.to_not raise_error
      expect { subject.date_precision = 'year' }.to_not raise_error
    end
  end
end
