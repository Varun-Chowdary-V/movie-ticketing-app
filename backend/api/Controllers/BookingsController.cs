using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/booking")]
    public class BookingsController : ControllerBase
    {

        private readonly MovieBookingDbContext _context;
        public BookingsController(MovieBookingDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetBookings()
        {
            var bookings = _context.Bookings.ToList();

            if (bookings == null)
            {
                return NotFound();
            }
            return Ok(bookings);
        }

        [HttpGet("{id}")]
        public IActionResult GetBooking([FromRoute] int id)
        {
            var booking = _context.Bookings.Find(id);

            if (booking == null)
            {
                return NotFound();
            }

            return Ok(booking);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBooking([FromRoute] int id, Booking booking)
        {
            if (id != booking.Id)
            {
                return BadRequest();
            }
            var existingBooking = await _context.Bookings.FindAsync(id);
            if (existingBooking == null)
            {
                return NotFound("Booking not found with id " + id);
            }

            _context.Bookings.Entry(existingBooking).CurrentValues.SetValues(booking);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingExists(id))
                {
                    return NotFound("Booking not found");
                }
                throw;
            }
            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> AddBooking(Booking booking)
        {
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetBooking", new { id = booking.Id }, booking);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound("Booking not found to delete");
            }

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("Users/{userid}/Bookings")]
        public async Task<IActionResult> GetBookingsOfUser(int userid)
        {
            var bookings = await _context.Bookings.Where(b => b.Userid == userid).ToListAsync();
            if (bookings == null || !bookings.Any())
            {
                return NotFound();
            }
            return Ok(bookings);
        }

        [HttpGet("Theatres/{Theatreid}/Bookings")]
        public async Task<IActionResult> GetBookingsOfTheatre(int Theatreid)
        {
            var bookings = await _context.Bookings.Where(b => b.Theatreid == Theatreid).ToListAsync();
            if (bookings == null || !bookings.Any())
            {
                return NotFound();
            }
            return Ok(bookings);
        }

        private bool BookingExists(int id)
        {
            return _context.Bookings.Any(e => e.Id == id);
        }
    }
}