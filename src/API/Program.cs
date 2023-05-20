using BaseAPI;
using BaseAPI.Classes;
using Engine.Constants;

Builder.Build(new WebProperties("InventoryAPI", WebApplication.CreateBuilder(args))
{
    ConnectionString = C.INVENTORY_UTT_DB
},
    builderCallback: web =>
    {

    },
    appCallback: app =>
    {

    }
);