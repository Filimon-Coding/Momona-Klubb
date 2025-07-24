using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MomonaApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialClean : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "AQAAAAEAACcQAAAAENvI2r2qg2cKq1g8m0gqgC3m7yqQyqvCwq2pK0qg1g==");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Admins",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "89U2yP02kOs29wMMdlBHjQ==.YMxtV6XPGdlF+5rKfnIWHrIAI0TfVjih5vdefN73nTA=");
        }
    }
}
