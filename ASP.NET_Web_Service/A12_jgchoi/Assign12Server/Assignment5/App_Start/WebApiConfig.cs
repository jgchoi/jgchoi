﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
// added...
using System.Web.Http.ExceptionHandling;

namespace Assignment5
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Attention 02 - Initialize HTTP OPTIONS handler
            config.MessageHandlers.Add(new ServiceLayer.HandleHttpOptions());

            // This is the customized error handler
            config.Services.Replace(typeof(IExceptionHandler), new ServiceLayer.HandleError());

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { controller = "Root", id = RouteParameter.Optional }
            );
        }
    }
}
