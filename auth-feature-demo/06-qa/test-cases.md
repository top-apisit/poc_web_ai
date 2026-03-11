# Authentication Feature - Test Cases

## 1. Test Summary

| Category | Total | Priority |
|----------|-------|----------|
| Registration | 12 | P0-P1 |
| Login | 10 | P0-P1 |
| Logout | 4 | P0 |
| Protected Routes | 6 | P0 |
| Security | 8 | P0 |

---

## 2. Registration Test Cases

### TC-REG-001: Successful Registration
**Priority**: P0
**Type**: Functional

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to /register | Registration form displayed |
| 2 | Enter valid username: "johndoe" | Input accepted |
| 3 | Enter valid email: "john@example.com" | Input accepted |
| 4 | Enter valid password: "password123" | Input accepted (masked) |
| 5 | Enter matching confirm password | Input accepted |
| 6 | Click "Create Account" | Loading state shown |
| 7 | Wait for response | Success message displayed |
| 8 | Observe redirect | Redirected to /login |

---

### TC-REG-002: Username Too Short
**Priority**: P1
**Type**: Validation

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Enter username: "ab" | - |
| 2 | Click "Create Account" | Error: "Username must be at least 3 characters" |

---

### TC-REG-003: Username Too Long
**Priority**: P1
**Type**: Validation

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Enter username with 21 characters | - |
| 2 | Click "Create Account" | Error: "Username must be at most 20 characters" |

---

### TC-REG-004: Username Invalid Characters
**Priority**: P1
**Type**: Validation

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Enter username: "john@doe" | - |
| 2 | Click "Create Account" | Error: "Username can only contain letters, numbers, and underscores" |

---

### TC-REG-005: Invalid Email Format
**Priority**: P1
**Type**: Validation

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Enter email: "notanemail" | - |
| 2 | Click "Create Account" | Error: "Invalid email address" |

---

### TC-REG-006: Password Too Short
**Priority**: P0
**Type**: Validation

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Enter password: "1234567" (7 chars) | - |
| 2 | Click "Create Account" | Error: "Password must be at least 8 characters" |

---

### TC-REG-007: Passwords Don't Match
**Priority**: P0
**Type**: Validation

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Enter password: "password123" | - |
| 2 | Enter confirm password: "password456" | - |
| 3 | Click "Create Account" | Error: "Passwords do not match" |

---

### TC-REG-008: Username Already Exists
**Priority**: P0
**Type**: Functional

**Precondition**: User "existinguser" already exists

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Enter username: "existinguser" | - |
| 2 | Enter valid email and password | - |
| 3 | Click "Create Account" | Error: "Username already exists" |

---

### TC-REG-009: Email Already Exists
**Priority**: P0
**Type**: Functional

**Precondition**: Email "existing@example.com" already registered

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Enter new username | - |
| 2 | Enter email: "existing@example.com" | - |
| 3 | Click "Create Account" | Error: "Email already exists" |

---

### TC-REG-010: Empty Form Submission
**Priority**: P1
**Type**: Validation

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Leave all fields empty | - |
| 2 | Click "Create Account" | All required fields show error |

---

### TC-REG-011: Link to Login Page
**Priority**: P2
**Type**: Navigation

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "Already have an account? Sign in" | Navigated to /login |

---

### TC-REG-012: Form Submission Loading State
**Priority**: P1
**Type**: UI

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Fill valid form | - |
| 2 | Click "Create Account" | Button shows loading spinner |
| 3 | - | Button is disabled during loading |
| 4 | - | Form fields are disabled |

---

## 3. Login Test Cases

### TC-LOGIN-001: Successful Login with Username
**Priority**: P0
**Type**: Functional

**Precondition**: User "johndoe" exists with password "password123"

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to /login | Login form displayed |
| 2 | Enter username: "johndoe" | Input accepted |
| 3 | Enter password: "password123" | Input masked |
| 4 | Click "Sign In" | Loading state shown |
| 5 | Wait for response | Success, JWT token stored |
| 6 | Observe redirect | Redirected to /dashboard |
| 7 | Check dashboard | "Welcome back, johndoe!" displayed |

---

### TC-LOGIN-002: Successful Login with Email
**Priority**: P0
**Type**: Functional

**Precondition**: User with email "john@example.com" exists

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Enter email: "john@example.com" in username field | Input accepted |
| 2 | Enter correct password | - |
| 3 | Click "Sign In" | Login successful |

---

### TC-LOGIN-003: Invalid Username
**Priority**: P0
**Type**: Functional

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Enter username: "nonexistentuser" | - |
| 2 | Enter any password | - |
| 3 | Click "Sign In" | Error: "Invalid username or password" |

---

### TC-LOGIN-004: Invalid Password
**Priority**: P0
**Type**: Functional

**Precondition**: User "johndoe" exists

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Enter username: "johndoe" | - |
| 2 | Enter wrong password | - |
| 3 | Click "Sign In" | Error: "Invalid username or password" |

---

### TC-LOGIN-005: Empty Username
**Priority**: P1
**Type**: Validation

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Leave username empty | - |
| 2 | Enter password | - |
| 3 | Click "Sign In" | Error: "Username is required" |

---

### TC-LOGIN-006: Empty Password
**Priority**: P1
**Type**: Validation

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Enter username | - |
| 2 | Leave password empty | - |
| 3 | Click "Sign In" | Error: "Password is required" |

---

### TC-LOGIN-007: Password Visibility Toggle
**Priority**: P2
**Type**: UI

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Enter password | Password masked (dots/asterisks) |
| 2 | Click eye icon | Password visible as plain text |
| 3 | Click eye icon again | Password masked again |

---

### TC-LOGIN-008: Link to Register Page
**Priority**: P2
**Type**: Navigation

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "Don't have an account? Sign up" | Navigated to /register |

---

### TC-LOGIN-009: Persisted Login State
**Priority**: P1
**Type**: Functional

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Login successfully | Token stored |
| 2 | Close browser tab | - |
| 3 | Open new tab to /dashboard | User still logged in |

---

### TC-LOGIN-010: Case Sensitivity
**Priority**: P2
**Type**: Functional

**Precondition**: User "JohnDoe" exists

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Enter username: "johndoe" (lowercase) | - |
| 2 | Enter correct password | - |
| 3 | Click "Sign In" | Behavior depends on implementation |

---

## 4. Logout Test Cases

### TC-LOGOUT-001: Successful Logout
**Priority**: P0
**Type**: Functional

**Precondition**: User is logged in

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "Logout" button | - |
| 2 | Wait for process | Token removed from storage |
| 3 | Observe redirect | Redirected to /login |
| 4 | Navigate to /dashboard | Redirected back to /login |

---

### TC-LOGOUT-002: Logout Clears All Session Data
**Priority**: P1
**Type**: Functional

**Precondition**: User is logged in

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Check localStorage before logout | Token present |
| 2 | Click "Logout" | - |
| 3 | Check localStorage after logout | Token removed |

---

### TC-LOGOUT-003: Back Button After Logout
**Priority**: P1
**Type**: Security

**Precondition**: User logged out

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click browser back button | - |
| 2 | Observe | Should NOT show protected content |
| 3 | - | Redirected to login |

---

### TC-LOGOUT-004: Multiple Tab Logout
**Priority**: P2
**Type**: Functional

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open app in 2 tabs while logged in | - |
| 2 | Logout in Tab 1 | - |
| 3 | Perform action in Tab 2 | Should redirect to login |

---

## 5. Protected Routes Test Cases

### TC-PROTECTED-001: Access Protected Route Without Login
**Priority**: P0
**Type**: Security

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Clear all tokens/cookies | - |
| 2 | Navigate directly to /dashboard | Redirected to /login |
| 3 | Check message | "Please log in to continue" |

---

### TC-PROTECTED-002: Access Protected Route With Valid Token
**Priority**: P0
**Type**: Functional

**Precondition**: User logged in with valid token

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to /dashboard | Dashboard displayed |
| 2 | User info visible | Correct username shown |

---

### TC-PROTECTED-003: Access Protected Route With Expired Token
**Priority**: P0
**Type**: Security

**Precondition**: Token expired

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to /dashboard | Redirected to /login |
| 2 | Check storage | Expired token cleared |

---

### TC-PROTECTED-004: Access Protected Route With Invalid Token
**Priority**: P0
**Type**: Security

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Manually set invalid token in storage | - |
| 2 | Navigate to /dashboard | Redirected to /login |

---

### TC-PROTECTED-005: Redirect After Login
**Priority**: P1
**Type**: Functional

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Try to access /dashboard (not logged in) | Redirected to /login |
| 2 | Login successfully | Redirected to /dashboard (original destination) |

---

### TC-PROTECTED-006: Access Public Route While Logged In
**Priority**: P2
**Type**: Functional

**Precondition**: User logged in

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to /login | Redirected to /dashboard |

---

## 6. Security Test Cases

### TC-SEC-001: SQL Injection Prevention
**Priority**: P0
**Type**: Security

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Enter username: "admin'; DROP TABLE users;--" | - |
| 2 | Click "Sign In" | Normal error, no SQL execution |

---

### TC-SEC-002: XSS Prevention
**Priority**: P0
**Type**: Security

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Register with username: "<script>alert('xss')</script>" | - |
| 2 | View username on dashboard | Script NOT executed, displayed as text |

---

### TC-SEC-003: Password Not in Response
**Priority**: P0
**Type**: Security

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Login successfully | - |
| 2 | Check network response | No password or hash in response |

---

### TC-SEC-004: Token in Secure Storage
**Priority**: P1
**Type**: Security

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Login successfully | - |
| 2 | Check token storage | Token stored securely |
| 3 | - | Token not in URL |

---

### TC-SEC-005: HTTPS Only (Production)
**Priority**: P0
**Type**: Security

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Access via HTTP in production | Redirected to HTTPS |

---

### TC-SEC-006: Rate Limiting
**Priority**: P1
**Type**: Security

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Attempt login 5 times with wrong password | - |
| 2 | Attempt 6th login | Rate limit error (429) |

---

### TC-SEC-007: Password Hashing Verification
**Priority**: P0
**Type**: Security (Backend)

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Check database after registration | Password stored as hash, not plain text |
| 2 | Verify hash format | BCrypt format ($2b$...) |

---

### TC-SEC-008: JWT Signature Validation
**Priority**: P0
**Type**: Security

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Get valid JWT token | - |
| 2 | Modify payload (change user ID) | - |
| 3 | Send modified token | 401 Unauthorized |

---

## 7. Test Data

### Valid Test Users
```json
[
  {
    "username": "testuser1",
    "email": "test1@example.com",
    "password": "password123"
  },
  {
    "username": "testuser2",
    "email": "test2@example.com",
    "password": "securePass456"
  }
]
```

### Invalid Inputs for Testing
```json
{
  "usernames": ["ab", "a".repeat(25), "user@name", "user name"],
  "emails": ["notanemail", "@example.com", "user@", "user@.com"],
  "passwords": ["1234567", "", "   "]
}
```
