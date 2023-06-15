using Microsoft.AspNetCore.Mvc;
using Engine.BO;
using Engine.Constants;
using Engine.Services;
using Engine.DAL;
using System.Security.Claims;
using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
using System.Text.RegularExpressions;

namespace BaseAPI.Classes;

public abstract class CustomController : ControllerBase
{
    // Callbacks
    public delegate object? ActionResult();
    public delegate Result? ActionResult_R();
    public delegate Result? CallbackResult(Result? result);

    public static Func<ClaimsPrincipal, string?>? GetUser { get; set; } = null;

    protected List<RequestError> ErrorsRequest { get; set; }
    protected InventoryDAL DAL { get; set; }
    protected ExceptionManager ErrorManager { get; set; }

    public CustomController() {
        ErrorsRequest = new List<RequestError>();
        ErrorManager = new(SetErrorOnRequest);
        DAL = InventoryDAL.GetInstance(ErrorManager.Subscription);
    }

    protected Result RequestResponse(
        ActionResult action,
        ActionResult? action2 = null,
        ActionResult? action3 = null,
        ActionResult? action4 = null
    ) => RequestBlock(result => {
        if (result != null)
        {
            result.Data = action();

            if (action2 != null)
                result.Data2 = action2();

            if (action3 != null)
                result.Data3 = action3();

            if (action4 != null)
                result.Data4 = action4();

            result.Message = C.COMPLETE;
        }

        return result 
            ?? throw new Exception("RequestResponse result is Empty. RequestResponse()");
    });   

    protected Result RequestBlock(CallbackResult action)
    {
        Result result = new() { Status = C.OK };

        try
        {
            result = action(result) 
                  ?? throw new Exception("RequestResponse result is Empty. RequestBlock()");

            if (ErrorsRequest != null && ErrorsRequest.Count > 0)
            {
                throw new Exception("Errors on request.");
            }
        }
        catch (Exception ex)
        {
            ErrorResult(this, result, ex);
        }

        return result;
    }

    protected void SetErrorOnRequest(Exception ex, string msg) => ErrorsRequest.Add(new RequestError()
    {
        Info = msg,
        Exception = ex
    });

    protected string? GetUserIdentity() => GetUser?.Invoke(User);

    protected bool IsSHA256(string? str)
    {
        string pattern = @"^[0-9A-Fa-f]{64}$";

        Regex regex = new (pattern);

        return !string.IsNullOrEmpty(str) && regex.IsMatch(str);
    }

    public static void ErrorResult(CustomController controller, Result result, Exception? ex = null)
    {
        result.Status = C.ERROR;
        result.Data = RequestError.FormatErrors(controller.ErrorsRequest);

        if (ex != null)
        {
            result.Message = ex.Message;
        }
        else
        {
            result.Message = "Fatal Error.";
        }
    }

    public static T? GetItem<T>(List<T> list, string? emptyMsg = null)
    {
        if (list != null && list.Count > 0)
        {
            return list[0];
        }

        return default;
    }
}