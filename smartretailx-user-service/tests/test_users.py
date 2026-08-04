from smartretailx_common.security import get_password_hash, verify_password

def test_password_hashing():
    pwd = "secretpassword123"
    hashed = get_password_hash(pwd)
    assert verify_password(pwd, hashed) is True
    assert verify_password("wrongpassword", hashed) is False
