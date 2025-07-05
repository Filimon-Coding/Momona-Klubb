using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MomonaApi.Migrations
{
    /// <inheritdoc />
    public partial class AddEventsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CurrentPlayer",
                table: "GameStatuses",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "TakenAt",
                table: "GameStatuses",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    StartsAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    ImageUrl = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Events",
                columns: new[] { "Id", "Description", "ImageUrl", "StartsAt", "Title" },
                values: new object[] { 1, "Enjoy a smooth evening of live jazz…", "/images/jazz.jpg", new DateTime(2025, 8, 17, 18, 0, 0, 0, DateTimeKind.Utc), "Live Jazz Night" });

            migrationBuilder.UpdateData(
                table: "GameStatuses",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CurrentPlayer", "TakenAt" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "GameStatuses",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CurrentPlayer", "TakenAt" },
                values: new object[] { null, null });

            migrationBuilder.UpdateData(
                table: "GameStatuses",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CurrentPlayer", "TakenAt" },
                values: new object[] { null, null });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropColumn(
                name: "CurrentPlayer",
                table: "GameStatuses");

            migrationBuilder.DropColumn(
                name: "TakenAt",
                table: "GameStatuses");
        }
    }
}
