﻿using System;
using System.Collections.Generic;

namespace Entities.Services
{
    public interface IDoctorService
    {
        List<DoctorInfo> GetDoctors();

        List<string[]> GetProfessions(bool isStatic);

        List<string[]> GetDoctorsByProfession(string profession);

        List<string[]> GetDoctorsByProfessionId(int professionId);

        List<string[]> GetDoctorSchedule(int doctorId);

        List<DoctorRules> GetDoctorAllRules(int doctorId, DateTime dateStart, DateTime dateFinish);

        List<string[]> ConvertToEvents(List<DoctorRules> allRules, DateTime dateStart, DateTime dateFinish);

        List<Event> GetPrimaryEventsAsFaked(List<string[]> events);

        List<Event> GetDoctorBookedEvents(int IdDoctor, DateTime dateStart, DateTime dateFinish);

        List<Event> GetGeneralEventsList(List<Event> fakedEvents, List<Event> bookedEvents);
    }
}
