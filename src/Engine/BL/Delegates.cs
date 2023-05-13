using System;
using System.Data;
using Engine.BO;

namespace Engine.BL;

public static class Delegates {
    // Errors
    public delegate void CallbackException(Exception ex);
    public delegate void CallbackExceptionMsg(Exception ex, string msg);

    // Callbacks
    public delegate object? ActionResult();
    public delegate Result? ActionResult_R();
    public delegate Result CallbackResult(Result  result);
    public delegate void CallbackReader(IDataReader reader);
}