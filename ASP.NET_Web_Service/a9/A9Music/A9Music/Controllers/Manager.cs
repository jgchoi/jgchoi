﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
// new...
using AutoMapper;
using A9Music.Models;
using System.Security.Claims;

namespace A9Music.Controllers
{
    public class Manager
    {
        // Reference to the data context
        private DataContext ds = new DataContext();

        public Manager()
        {
            // If necessary, add constructor code here

            // Turn off the Entity Framework (EF) proxy creation features
            // We do NOT want the EF to track changes - we'll do that ourselves
            ds.Configuration.ProxyCreationEnabled = false;

            // Also, turn off lazy loading...
            // We want to retain control over fetching related objects
            ds.Configuration.LazyLoadingEnabled = false;
        }

        // Add methods below
        // Controllers will call these methods
        // Ensure that the methods accept and deliver ONLY view model objects and collections
        // The collection return type is almost always IEnumerable<T>

        // Suggested naming convention: Entity + task/action
        // For example:
        // ProductGetAll()
        // ProductGetById()
        // ProductAdd()
        // ProductEdit()
        // ProductDelete()

        // ############################################################
        // Employees

        // Attention 14 - Manager methods, which perform data service tasks (unchanged from the past)
        // Notice that the pattern is similar to what you did in web apps

        // All employees
        public IEnumerable<EmployeeBase> EmployeeGetAll()
        {
            // Fetch the collection
            var c = ds.Employees.OrderBy(e => e.LastName).ThenBy(e => e.FirstName);

            // Return the results as a collection based on a resource model class
            return Mapper.Map<IEnumerable<EmployeeBase>>(c);
        }

        // Employee by identifier
        public EmployeeBase EmployeeGetById(int id)
        {
            // Attempt to fetch the object
            var o = ds.Employees.Find(id);

            // Return the result, or null if not found
            return (o == null) ? null : Mapper.Map<EmployeeBase>(o);
        }

        // Add employee
        public EmployeeBase EmployeeAdd(EmployeeAdd newItem)
        {
            // Attempt to add the object
            var addedItem = ds.Employees.Add(Mapper.Map<Employee>(newItem));
            ds.SaveChanges();

            // Return the result, or null if there was an error
            return (addedItem == null) ? null : Mapper.Map<EmployeeBase>(addedItem);
        }

        // Edit employee - contact info only
        public EmployeeBase EmployeeEditContactInfo(EmployeeEditContactInfo editedItem)
        {
            // Ensure that we can continue
            if (editedItem == null) { return null; }

            // Attempt to fetch the object
            var storedItem = ds.Employees.Find(editedItem.EmployeeId);

            if (storedItem == null)
            {
                return null;
            }
            else
            {
                // Fetch the object from the data store - ds.Entry(storedItem)
                // Get its current values collection - .CurrentValues
                // Set those to the edited values - .SetValues(editedItem)
                ds.Entry(storedItem).CurrentValues.SetValues(editedItem);
                // The SetValues() method ignores missing properties and navigation properties
                ds.SaveChanges();

                return Mapper.Map<EmployeeBase>(storedItem);
            }
        }

        // Delete employee
        public void EmployeeDelete(int id)
        {
            // Attempt to fetch the existing item
            var storedItem = ds.Employees.Find(id);

            // Interim coding strategy...

            if (storedItem == null)
            {
                // Throw an exception, and you will learn how soon
            }
            else
            {
                try
                {
                    // If this fails, throw an exception (as above)
                    // This implementation just prevents an error from bubbling up
                    ds.Employees.Remove(storedItem);
                    ds.SaveChanges();
                }
                catch (Exception) { }
            }
        }

        public EmployeeBase EmployeeEditManager(EmployeeEditManager editedItem)
        {
            // Ensure that we can continue
            if (editedItem == null) { return null; }

            // Attempt to fetch the object
            var storedItem = ds.Employees
                .Include("Employee1")
                .Include("Employee2")
                .SingleOrDefault(e => e.EmployeeId == editedItem.EmployeeId);

            var s = ds.Employees
                .Include("Employee1")
                .SingleOrDefault(e => e.EmployeeId == editedItem.Employee2EmployeeId);

            // Check s's name vs. Authroized person's name
            // If name is different do not make chenge
            var user = HttpContext.Current.User as ClaimsPrincipal;
            var surname = user.Claims
                              .SingleOrDefault(c => c.Type == ClaimTypes.Surname)
                              .Value;
            var givenname = user.Claims
                                .SingleOrDefault(c => c.Type == ClaimTypes.GivenName)
                                .Value;

            if(s.FirstName != givenname || s.LastName != surname)
            {
                //Name of requestor is not same as the name on the database
                return null;
            }


            if (storedItem == null || s == null)
            {
                return null;
            }
            else
            {
                // Fetch the object from the data store - ds.Entry(storedItem)
                // Get its current values collection - .CurrentValues
                // Set those to the edited values - .SetValues(editedItem)
                s.Employee1.Remove(storedItem);
                ds.Entry(storedItem).CurrentValues.SetValues(editedItem);
                storedItem.Employee2 = s;

                // The SetValues() method ignores missing properties and navigation properties
                ds.SaveChanges();

                return Mapper.Map<EmployeeBase>(storedItem);
            }
        }
    }
}
