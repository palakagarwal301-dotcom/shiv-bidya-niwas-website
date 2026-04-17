import requests
import sys
from datetime import datetime
import json

class FinancialServicesAPITester:
    def __init__(self, base_url="https://site-creator-2006.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            print(f"Response Status: {response.status_code}")
            print(f"Response Headers: {dict(response.headers)}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"Response Data: {json.dumps(response_data, indent=2, default=str)}")
                    return True, response_data
                except:
                    print("Response is not JSON")
                    return True, response.text
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"Error Response: {json.dumps(error_data, indent=2)}")
                except:
                    print(f"Error Response Text: {response.text}")
                
                self.failed_tests.append({
                    "test": name,
                    "endpoint": endpoint,
                    "expected": expected_status,
                    "actual": response.status_code,
                    "error": response.text
                })
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                "test": name,
                "endpoint": endpoint,
                "error": str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "api/",
            200
        )

    def test_create_contact_inquiry(self):
        """Test creating a contact inquiry"""
        test_data = {
            "name": "Test User",
            "phone": "+91 9876543210",
            "email": "test@example.com",
            "service": "IEPF Recovery",
            "message": "I need help recovering my unclaimed shares from XYZ company."
        }
        
        return self.run_test(
            "Create Contact Inquiry",
            "POST",
            "api/contacts",
            200,
            data=test_data
        )

    def test_get_all_inquiries(self):
        """Test getting all contact inquiries"""
        return self.run_test(
            "Get All Contact Inquiries",
            "GET",
            "api/contacts",
            200
        )

    def test_create_contact_inquiry_validation(self):
        """Test contact inquiry validation with missing fields"""
        test_data = {
            "name": "Test User",
            "phone": "+91 9876543210"
            # Missing email, service, message
        }
        
        return self.run_test(
            "Contact Inquiry Validation (Missing Fields)",
            "POST",
            "api/contacts",
            422,  # Validation error
            data=test_data
        )

    def test_create_contact_inquiry_invalid_email(self):
        """Test contact inquiry with invalid email"""
        test_data = {
            "name": "Test User",
            "phone": "+91 9876543210",
            "email": "invalid-email",
            "service": "IEPF Recovery",
            "message": "Test message"
        }
        
        return self.run_test(
            "Contact Inquiry Invalid Email",
            "POST",
            "api/contacts",
            422,  # Validation error
            data=test_data
        )

def main():
    print("🚀 Starting Financial Services API Tests...")
    print("=" * 60)
    
    # Setup
    tester = FinancialServicesAPITester()
    
    # Run tests
    print("\n📋 Testing Basic API Functionality...")
    tester.test_root_endpoint()
    
    print("\n📋 Testing Contact Form Functionality...")
    tester.test_create_contact_inquiry()
    tester.test_get_all_inquiries()
    
    print("\n📋 Testing Validation...")
    tester.test_create_contact_inquiry_validation()
    tester.test_create_contact_inquiry_invalid_email()
    
    # Print results
    print("\n" + "=" * 60)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} passed")
    
    if tester.failed_tests:
        print("\n❌ Failed Tests:")
        for failed in tester.failed_tests:
            print(f"  - {failed['test']}: {failed.get('error', 'Status code mismatch')}")
    
    print("=" * 60)
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())