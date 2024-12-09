using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Onnes.Migrations
{
    /// <inheritdoc />
    public partial class nav : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "routerLink",
                table: "NavItem",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "routerLink",
                table: "NavItem");
        }
    }
}
