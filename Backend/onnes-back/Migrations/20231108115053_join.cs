using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Onnes.Migrations
{
    /// <inheritdoc />
    public partial class join : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "image",
                table: "JoinUs");

            migrationBuilder.DropColumn(
                name: "mail",
                table: "JoinUs");

            migrationBuilder.AddColumn<string>(
                name: "image",
                table: "Offering",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "image",
                table: "Offering");

            migrationBuilder.AddColumn<string>(
                name: "image",
                table: "JoinUs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "mail",
                table: "JoinUs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
