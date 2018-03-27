﻿using System;
using System.Collections.Generic;

namespace HoReD_Entts.Services
{
    public class DoctorService : IDoctorService
    {
        private readonly IDbContext _dbContext;

        public DoctorService(IDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Doctor GetDoctorById(int id)
        {
            var cmd = $"Select * from Doctors where IDDoctors = {id}";
            var str = _dbContext.ExecuteSqlQuery(cmd, '*');
            var values = str.Split('*');
            var doctor = new Doctor
            {
                Id = Convert.ToInt32(values.GetValue(0)),
                IdProfession = Convert.ToInt32(values.GetValue(1)),
                StartHour = TimeSpan.Parse(values.GetValue(2).ToString()),
                EndHour = TimeSpan.Parse(values.GetValue(3).ToString()),
                EmployingDate = Convert.ToDateTime(values.GetValue(4)),
                Image = values.GetValue(5).ToString()
            };
            _dbContext.Dispose();

            return doctor;
        }

        public List<DoctorInfo> GetDoctors()
        {
            const string cmd = "GETINFOABOUTDOCTORS";
            var str = _dbContext.ExecuteSqlQuery(cmd, '*');
            var values = str.Split('*');
            var list = new List<DoctorInfo>();
            for (int i = 0; i < (values.Length-1); i+=8)
            {
                var doctor = new DoctorInfo
                {
                    Id = Convert.ToInt32(values.GetValue(0 + i)),
                    FirstName = values.GetValue(1 + i).ToString(),
                    LastName = values.GetValue(i + 2).ToString(),
                    ProfessionName = values.GetValue(i + 3).ToString(),
                    StartHour = TimeSpan.Parse(values.GetValue(i + 4).ToString()),
                    EndHour = TimeSpan.Parse(values.GetValue(i + 5).ToString()),
                    EmployingDate = Convert.ToDateTime(values.GetValue(i + 6).ToString()),
                    Image = values.GetValue(i + 7).ToString()
                };
                list.Add(doctor);

            }
            _dbContext.Dispose();
            return list;
        }
    }
}
