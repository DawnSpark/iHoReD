﻿using Entities.Services;
using HoReD.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Entities;
using HoReD.AuthFilters;

namespace HoReD.Controllers
{
    /// <summary>
    /// Manages general User data
    /// </summary>
    public class UserController : ApiController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Edits record in database with general info
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [TokenAuthenticate(Role = "user")]
        [Route("EditUserInfo")]
        public IHttpActionResult EditUserInfo(UserInfoBindingModel model)
        {
            _userService.ApdateInfoAboutUser(model.Id, model.FirstName, model.LastName, model.Email, model.Password, model.IsActivated, model.Phone, model.Sex, model.Country, model.City, model.Street, model.Apartment);
            return Ok();
        }

        /// <summary>
        /// Gets all general info about user
        /// </summary>
        /// <param name="UserInfoId">ID of needed user</param>
        /// <returns>UserInfo</returns>
        [HttpGet]
        [TokenAuthenticate(Role = "user,doctor,admin")]
        [Route("GetUserInfoById/{UserInfoId}")]
        public IHttpActionResult GetUserInfoById(int UserInfoId)
        {
            return Ok(_userService.GetUserInfoById(UserInfoId));
        }

        [HttpGet]
        [TokenAuthenticate(Role = "admin")]
        [Route("GetInfoAboutAllUsers/{numberPage}/{countInPage}")]
        public IHttpActionResult GetInfoAboutAllUsers(int numberPage, int countInPage)
        {
            return Ok(_userService.GetAllUsers(numberPage,countInPage));
        }
        [HttpGet]
        [TokenAuthenticate(Role = "admin")]
        [Route("FilterAllUsers/{numberPage}/{countInPage}/{isAdmin}/{isDoctor}")]
        [Route("FilterAllUsers/{numberPage}/{countInPage}/{isAdmin}/{isDoctor}/{firstOrlastname}")]
        public IHttpActionResult FilterAllUsers(int numberPage, int countInPage,bool isAdmin, bool isDoctor, string firstOrlastname=null)
        {
            return Ok(_userService.FilteringUsers(numberPage, countInPage,isAdmin,isDoctor,firstOrlastname));
        }

        [HttpGet]
        [TokenAuthenticate(Role = "admin")]
        [Route("NumbersOfPage/{countInPage}")]
        public IHttpActionResult NumbersOfPage(int countInPage)
        {
            return Ok(_userService.GetPaginationCount(countInPage));
        }

        [HttpGet]
        [TokenAuthenticate(Role = "admin")]
        [Route("GetUserRole/{idUser}")]
        public IHttpActionResult GetUserRole(int idUser)
        {
            return Ok(_userService.GetUserRole(idUser));
        }

        [HttpGet]
        [TokenAuthenticate(Role = "admin")]
        [Route("GetUserAvailableRole/{idUser}")]
        public IHttpActionResult GetUserAvailableRole(int idUser)
        {
            return Ok(_userService.GetUserAvailableRole(idUser));
        }

        [HttpGet]
        [TokenAuthenticate(Role = "admin")]
        [Route("NumbersOfPageFiltered/{countInPage}/{isAdmin}/{isDoctor}")]
        [Route("NumbersOfPageFiltered/{countInPage}/{isAdmin}/{isDoctor}/{firstOrlastname}")]
        public IHttpActionResult NumbersOfPageFiltered(int countInPage,bool isAdmin, bool isDoctor, string firstOrLastname=null)
        {
            return Ok(_userService.GetPaginationCountFiltered(countInPage,isAdmin,isDoctor,firstOrLastname));
        }

        [HttpGet]
        [TokenAuthenticate(Role = "admin")]
        [Route("ChangeRole/{userId}/{role}")]
        [Route("ChangeRole/{userId}/{role}/{idProffesion}")]
        public IHttpActionResult ChangeRole(int userId, int role, int idProffesion = 0)

        {
            _userService.ChangeRole(userId, role, idProffesion);
            return Ok();
        }
    }
}
