"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"

interface DatePickerProps {
  id: string
  name: string
  value?: string
  onChange: (date: string) => void
}

const DatePicker: React.FC<DatePickerProps> = ({ id, name, value, onChange }) => {
  const [showCalendar, setShowCalendar] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date()) // Date object for calendar navigation
  const datePickerRef = useRef<HTMLDivElement>(null)

  // Update currentMonth if value changes externally (e.g., initial load)
  useEffect(() => {
    if (value) {
      const [year, month, day] = value.split("-").map(Number)
      setCurrentMonth(new Date(year, month - 1, day))
    }
  }, [value])

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowCalendar(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const days = []

    // Add leading empty days for alignment (Monday start)
    const startDay = firstDayOfMonth.getDay() // 0 for Sunday, 1 for Monday
    const numLeadingEmptyDays = startDay === 0 ? 6 : startDay - 1 // Adjust for Monday start

    for (let i = 0; i < numLeadingEmptyDays; i++) {
      days.push(null)
    }

    // Add days of the current month
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const handleDayClick = useCallback(
    (day: Date) => {
      const year = day.getFullYear()
      const month = (day.getMonth() + 1).toString().padStart(2, "0")
      const date = day.getDate().toString().padStart(2, "0")
      const formattedDate = `${year}-${month}-${date}`
      onChange(formattedDate)
      setShowCalendar(false)
    },
    [onChange],
  )

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  const formattedValue = value
    ? new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : ""

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  return (
    <div className={`date-picker-container ${showCalendar ? "date-picker-active" : ""}`} ref={datePickerRef}>
      <input
        type="text"
        id={id}
        name={name}
        value={formattedValue}
        readOnly
        onClick={() => setShowCalendar(!showCalendar)}
        className="date-picker-input"
        placeholder="Select a date"
      />

      {showCalendar && (
        <div className="calendar-popup">
          <div className="calendar-header">
            <button type="button" onClick={handlePrevMonth} className="nav-button" aria-label="Previous month">
              &lt;
            </button>
            <span className="current-month-year">
              {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </span>
            <button type="button" onClick={handleNextMonth} className="nav-button" aria-label="Next month">
              &gt;
            </button>
          </div>
          <div className="calendar-days-of-week">
            {daysOfWeek.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="calendar-grid">
            {getDaysInMonth(currentMonth).map((day, index) => (
              <button
                type="button"
                key={index}
                className={`calendar-day ${day ? "" : "empty"} ${
                  value && day && new Date(value).toDateString() === day.toDateString() ? "selected" : ""
                }`}
                onClick={() => day && handleDayClick(day)}
                disabled={!day}
              >
                {day ? day.getDate() : ""}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default DatePicker
