﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.Services;

namespace Entities.Utils
{
    public static class ParseSqlQuery
    {
        public static List<DoctorInfo> GetDoctorsByIdRule(string str)
        {
            var values = str.Split('*');
            var list = new List<DoctorInfo>();
            for (int i = 0; i < (values.Length - 1); i += 4)
            {
                var doctor = new DoctorInfo
                {
                    Id = Convert.ToInt32(values.GetValue(i)),
                    FirstName = values.GetValue(1 + i).ToString(),
                    LastName = values.GetValue(2 + i).ToString(),
                    ProfessionName = values.GetValue(3 + i).ToString(),
                };
                list.Add(doctor);

            }
            return list;
        }

        public static List<DoctorRules> GetRules(string str)
        {
            var values = str.Split('*');
            var list = new List<DoctorRules>();
            for (int i = 0; i < (values.Length - 1); i += 14)
            {
                var doctorRule = new DoctorRules()
                {
                    IdRule = Convert.ToInt32(values.GetValue(i).ToString()),
                    RuleName = values.GetValue(i + 1).ToString(),
                    HourStart = TimeSpan.Parse(values.GetValue(i + 2).ToString()),
                    HourFinish = TimeSpan.Parse(values.GetValue(i + 3).ToString()),
                    PeriodStart = DateTime.Parse(values.GetValue(i + 4).ToString()),
                    PeriodFinish = DateTime.Parse(values.GetValue(i + 5).ToString()),
                    IfInclusive = Convert.ToBoolean(values.GetValue(i + 6)),
                    Week = new Dictionary<DayOfWeek, bool>()
                    {
                        {DayOfWeek.Sunday, Convert.ToBoolean(values.GetValue(i + 7).ToString().ToLowerInvariant())},
                        {DayOfWeek.Monday,  Convert.ToBoolean(values.GetValue(i + 8).ToString().ToLowerInvariant())},
                        {DayOfWeek.Tuesday,  Convert.ToBoolean(values.GetValue(i + 9).ToString().ToLowerInvariant())},
                        {DayOfWeek.Wednesday,  Convert.ToBoolean(values.GetValue(i + 10).ToString().ToLowerInvariant())},
                        {DayOfWeek.Thursday,  Convert.ToBoolean(values.GetValue(i + 11).ToString().ToLowerInvariant())},
                        {DayOfWeek.Friday,  Convert.ToBoolean(values.GetValue(i + 12).ToString().ToLowerInvariant())},
                        {DayOfWeek.Saturday,  Convert.ToBoolean(values.GetValue(i + 13).ToString().ToLowerInvariant()) }
                    },
                };
                list.Add(doctorRule);
            }
            return list;
        }

        public static List<Event> GetDoctorBookedEvents(string str)
        {
            var values = str.Split('*');
            var list = new List<Event>();

            for (int i = 0; i < (values.Length - 1); i += 3)
            {
                string[] startEndDateTime = {Convert.ToDateTime(values.GetValue(i + 1)).ToString(StaticData.DatePattern),
                    Convert.ToDateTime(values.GetValue(i + 1)).ToString(StaticData.TimePattern), Convert.ToDateTime(values.GetValue(i + 2)).ToString(StaticData.TimePattern) };
                var bookedEvent = new Event()
                {
                    dateTime = startEndDateTime,
                    isFake = false
                };

                list.Add(bookedEvent);
            }

            return list;
        }

        public static List<SalaryStatistics> GetDoctorSalaryStatistics(string str)
        {
            var values = str.Split('*');
            var list = new List<SalaryStatistics>();

            for (int i = 0; i < (values.Length - 1); i += 5)
            {
                SalaryStatistics salaryPerDay = new SalaryStatistics()
                {
                    Day = Convert.ToDateTime(values.GetValue(i)),
                    WorkedHours = Convert.ToDouble(values.GetValue(i + 1)),
                    SalaryRate = Convert.ToDouble(values.GetValue(i + 2)),
                    SalaryCoefficient = Convert.ToDouble(values.GetValue(i + 3)),
                    EarnedMoney = Convert.ToDouble(values.GetValue(i + 4))
                };

                list.Add(salaryPerDay);
            }

            return list;
        }

        /// <summary>
        /// Almost identical to GetDoctorBookedEvents, but also returns name,surname & id of user, that booked session
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static List<Tuple<Event,User>> GetDoctorBookedEventsForDoctor(string str)
        {
            var values = str.Split('*');
            var list = new List<Tuple<Event,User>>();
            string datePattern = "yyyy-MM-dd";
            string timePattern = "HH:mm:ss";
            for (int i = 0; i < (values.Length - 1); i += 6)
            {
                string[] startEndDateTime = {Convert.ToDateTime(values.GetValue(i + 1)).ToString(datePattern),
                    Convert.ToDateTime(values.GetValue(i + 1)).ToString(timePattern), Convert.ToDateTime(values.GetValue(i + 2)).ToString(timePattern) };
                var eventToPaste = new Event()
                {
                    dateTime = startEndDateTime,
                    isFake = false
                };
                var userToPaste = new User()
                {
                    Id = (values.GetValue(i) == null) ? 0 : Convert.ToInt32(values.GetValue(i)),
                };
                list.Add(new Tuple<Event, User>(eventToPaste,userToPaste));
            }
            return list;
        }


        public static UserInfo GetAllUserInfo(string str)
        {
            var values = str.Split('*');
            try
            {
                var userInfo = new UserInfo
                {
                    Id = Convert.ToInt32(values.GetValue(0)),
                    FirstName = values.GetValue(1).ToString(),
                    LastName = values.GetValue(2).ToString(),
                    Password = values.GetValue(3).ToString(),
                    Email = values.GetValue(4).ToString(),
                    Phone = values.GetValue(5).ToString(),
                    Sex = (values.GetValue(6) == "") ? false : Convert.ToBoolean(values.GetValue(6).ToString()),
                    Country = values.GetValue(7).ToString(),
                    City = values.GetValue(8).ToString(),
                    Street = values.GetValue(9).ToString(),
                    Apartment = values.GetValue(10).ToString()
                };
                return userInfo;
            }
            catch (Exception)
            {
                return new UserInfo() { Id = 0 };
            }
        }


        public static List<MedicalCard> GetMedicalCards(string dbResult)
        {
            var values = dbResult.Split('*');
            var result = new List<MedicalCard>();
            for (int i = 0; i < values.Length - 1; i += 9)
            {
                var medicalCard = new MedicalCard
                {
                    CardId = Convert.ToInt32(values.GetValue(i)),
                    Description = values.GetValue(1 + i).ToString(),
                    Cure = values.GetValue(2 + i).ToString(),
                    DoctorFirstname = values.GetValue(3 + i).ToString(),
                    Doctorlastname = values.GetValue(4 + i).ToString(),
                    IdPatient = Convert.ToInt32(values.GetValue(5 + i)),
                    StartDateTime = Convert.ToDateTime(values.GetValue(6 + i)),
                    IdVisit = Convert.ToInt32(values.GetValue(7 + i)),
                    DiseaseName = values.GetValue(8 + i).ToString(),
                };
                result.Add(medicalCard);
            }
            
            return result;
        }
        public static List<PatientData> GetPatientData(string bdResult)
        {
            var values = bdResult.Split('*');
            var result = new List<PatientData>();
            for (int i = 0; i < values.Length - 1; i += 5)
            {
                var patientData = new PatientData
                {
                    FirstName = values.GetValue(i).ToString(),
                    LastName = values.GetValue(1 + i).ToString(),
                    Birthday = Convert.ToDateTime(values.GetValue(2 + i)),
                    Phone = values.GetValue(3 + i).ToString(),
                    BloodType = values.GetValue(4 + i).ToString(),
                };
                result.Add(patientData);
            }
            return result;
        }
        public static List<string> GetPatientAllergies(string bdResult)
        {
            var values = bdResult.Split('*');
            var result = new List<string>();
            for (int i = 0; i < values.Length; i++)
            {
                result.Add(values.GetValue(i).ToString());
            }
            return result;
        }

        public static List<SalaryRate> GetPastRates(string bdResult)
        {
            var values = bdResult.Split('*');
            var result = new List<SalaryRate>();
            for (int i = 0; i < (values.Length - 1); i += 2)
            {
                SalaryRate salary = new SalaryRate()
                {
                    Rate = Convert.ToDouble(values.GetValue(i)),
                    StartDate = Convert.ToDateTime(values.GetValue(i + 1)),
                    State = -1
                };

                result.Add(salary);
            }
            return result;
        }

        public static List<SalaryRate> GetFutureRates(string bdResult)
        {
            var values = bdResult.Split('*');
            var result = new List<SalaryRate>();
            for (int i = 0; i < (values.Length - 1); i += 2)
            {
                SalaryRate salary;
                if (i == 0)
                {
                    salary = new SalaryRate()
                    {
                        Rate = Convert.ToDouble(values.GetValue(i)),
                        StartDate = Convert.ToDateTime(values.GetValue(i + 1)),
                        State = 0
                    };
                }
                else
                {
                    salary = new SalaryRate()
                    {
                        Rate = Convert.ToDouble(values.GetValue(i)),
                        StartDate = Convert.ToDateTime(values.GetValue(i + 1)),
                        State = 1
                    };
                }

                result.Add(salary);
            }
            return result;
        }

        public static List<SalaryCoeff> GetPastCoeff(string bdResult)
        {
            var values = bdResult.Split('*');
            var result = new List<SalaryCoeff>();
            for (int i = 0; i < (values.Length - 1); i += 2)
            {
                SalaryCoeff salary = new SalaryCoeff()
                {
                    Coeff = Convert.ToDouble(values.GetValue(i)),
                    StartDate = Convert.ToDateTime(values.GetValue(i + 1)),
                    State = -1
                };

                result.Add(salary);
            }
            return result;
        }

        public static List<SalaryCoeff> GetFutureCoeff(string bdResult)
        {
            var values = bdResult.Split('*');
            var result = new List<SalaryCoeff>();
            for (int i = 0; i < (values.Length - 1); i += 2)
            {
                SalaryCoeff salary;
                if (i == 0)
                {
                    salary = new SalaryCoeff()
                    {
                        Coeff = Convert.ToDouble(values.GetValue(i)),
                        StartDate = Convert.ToDateTime(values.GetValue(i + 1)),
                        State = 0
                    };
                }
                else
                {
                    salary = new SalaryCoeff()
                    {
                        Coeff = Convert.ToDouble(values.GetValue(i)),
                        StartDate = Convert.ToDateTime(values.GetValue(i + 1)),
                        State = 1
                    };
                }

                result.Add(salary);
            }
            return result;
        }


    }
}
