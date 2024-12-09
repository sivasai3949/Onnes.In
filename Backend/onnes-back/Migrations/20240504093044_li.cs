using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Onnes.Migrations
{
    /// <inheritdoc />
    public partial class li : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "link",
                table: "Team");

            migrationBuilder.AddColumn<string>(
                name: "link1",
                table: "Team",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "link2",
                table: "Team",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "link3",
                table: "Team",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "link4",
                table: "Team",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "link1",
                table: "Team");

            migrationBuilder.DropColumn(
                name: "link2",
                table: "Team");

            migrationBuilder.DropColumn(
                name: "link3",
                table: "Team");

            migrationBuilder.DropColumn(
                name: "link4",
                table: "Team");

            migrationBuilder.AddColumn<string>(
                name: "link",
                table: "Team",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
