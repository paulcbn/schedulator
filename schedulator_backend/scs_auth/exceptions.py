class ScsAuthException(Exception):
    pass


class InvalidUniversitySSL(ScsAuthException):
    pass


class BadCredentials(ScsAuthException):
    pass
