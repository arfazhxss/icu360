-- Enable RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE triage_records ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own data" ON users
    FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Staff can view all users" ON users
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE auth.uid() = users.id
            AND role IN ('doctor', 'nurse', 'pharmacist', 'receptionist')
        )
    );

-- RLS Policies for patients table
CREATE POLICY "Patients can view their own data" ON patients
    FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Staff can view all patients" ON patients
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE auth.uid() = users.id
            AND role IN ('doctor', 'nurse', 'pharmacist', 'receptionist')
        )
    );

-- RLS Policies for triage_records table
CREATE POLICY "Patients can view their own triage records" ON triage_records
    FOR SELECT
    USING (patient_id = auth.uid());

CREATE POLICY "Staff can view all triage records" ON triage_records
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE auth.uid() = users.id
            AND role IN ('doctor', 'nurse', 'pharmacist', 'receptionist')
        )
    );

CREATE POLICY "Nurses can create triage records" ON triage_records
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM users
            WHERE auth.uid() = users.id
            AND role = 'nurse'
        )
    );

CREATE POLICY "Medical staff can update triage records" ON triage_records
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE auth.uid() = users.id
            AND role IN ('doctor', 'nurse')
        )
    );
