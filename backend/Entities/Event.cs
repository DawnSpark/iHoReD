﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Event
    {
        public string[] dateTime { get; set; }
        public bool isFake { get; set; }

        public Event(string[] dateTime, bool isFake)
        {
            this.dateTime = dateTime;
            this.isFake = isFake;
        }
    }
}
