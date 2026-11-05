# Frankfurter SDK utility: make_context

from projectname_sdk.core.context import FrankfurterContext


def make_context_util(ctxmap, basectx):
    return FrankfurterContext(ctxmap, basectx)
