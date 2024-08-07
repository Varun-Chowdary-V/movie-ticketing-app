using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace api.Models;

public partial class MovieBookingDbContext : DbContext
{
    public MovieBookingDbContext()
    {
    }

    public MovieBookingDbContext(DbContextOptions<MovieBookingDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Booking> Bookings { get; set; }

    public virtual DbSet<Movie> Movies { get; set; }

    public virtual DbSet<Theatre> Theatres { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("MovieApplication");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Booking>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__bookings__3213E83FFD7A8B41");

            entity.ToTable("bookings");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.BookingDate).HasColumnName("booking_date");
            entity.Property(e => e.BookingTime).HasColumnName("booking_time");
            entity.Property(e => e.Movieid).HasColumnName("movieid");
            entity.Property(e => e.Price)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("price");
            entity.Property(e => e.SeatsString)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("seatsString");
            entity.Property(e => e.Theatreid).HasColumnName("theatreid");
            entity.Property(e => e.Userid).HasColumnName("userid");

            entity.HasOne(d => d.Movie).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.Movieid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__bookings__moviei__2F10007B");

            entity.HasOne(d => d.Theatre).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.Theatreid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__bookings__theatr__300424B4");

            entity.HasOne(d => d.User).WithMany(p => p.Bookings)
                .HasForeignKey(d => d.Userid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__bookings__userid__2E1BDC42");
        });

        modelBuilder.Entity<Movie>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__movies__3213E83FB1953D44");

            entity.ToTable("movies");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Description)
                .HasColumnType("text")
                .HasColumnName("description");
            entity.Property(e => e.Duration).HasColumnName("duration");
            entity.Property(e => e.Lang)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("lang");
            entity.Property(e => e.Poster)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("poster");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("title");
            entity.Property(e => e.Trailer)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("trailer");
        });

        modelBuilder.Entity<Theatre>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__theatres__3213E83F39306D2B");

            entity.ToTable("theatres");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.BookedSeats)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("bookedSeats");
            entity.Property(e => e.ConvFee)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("convFee");
            entity.Property(e => e.Location)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("location");
            entity.Property(e => e.ShowTimings)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("showTimings");
            entity.Property(e => e.TheatreName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("theatreName");
            entity.Property(e => e.TicketFare)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("ticketFare");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__users__3214EC07EBFA6029");

            entity.ToTable("users");

            entity.HasIndex(e => e.Email, "UQ__users__A9D10534494D19E6").IsUnique();

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Dob).HasColumnName("DOB");
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.FirstName).HasMaxLength(255);
            entity.Property(e => e.Gender).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(255);
            entity.Property(e => e.PasswordHashed).HasMaxLength(255);
            entity.Property(e => e.Phone).HasMaxLength(50);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
