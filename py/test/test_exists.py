# Frankfurter SDK exists test

import pytest
from frankfurter_sdk import FrankfurterSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = FrankfurterSDK.test(None, None)
        assert testsdk is not None
