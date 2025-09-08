import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useUserLogoutapiMutation } from "@/services/userAuth";
import useCreateToken from "@/hooks/createNewToken";
import useAuth from "@/hooks/authSlice";

// This is sample data.

export function AppSidebar({ ...props }) {
  const { first_name, last_name, role_name, token, refreshToken } = useSelector(
    (state) => state.persisted?.user_auth
  );
  const [userLoginoutapi] = useUserLogoutapiMutation();
  const { createNewToken } = useCreateToken();
  const { userAuthSliceUpdated } = useAuth();
  const logout = async () => {
    try {
      const data = { token: token, refreshToken: refreshToken };
      const res = await userLoginoutapi(data).unwrap();
      if (res.error) {
        const result = await createNewToken({
          refreshToken: data.refreshToken,
        });
        await userLoginoutapi({
          token: result.message,
          refreshToken: result.refreshToken,
        }).unwrap();
        userAuthSliceUpdated();
      } else {
        userAuthSliceUpdated();
      }
    } catch (err) {
      console.error(err);
      if (err?.data?.error) {
        alert(err.data.message);
      }
    }
  };
  const data = {
    user: {
      name: `${first_name} ${last_name}`,
      email: `${role_name}`,
      avatar: "/avatars/shadcn.jpg",
      items: [
        {
          icon: <Bell />,
          name: "Logout",
          handle: () => logout(),
        },
      ],
    },
    teams: [
      {
        name: "Smart Edu School",
        logo: Command,
        url: "/",
      },
    ],
    navMain: [
      {
        title: "Addmission Management",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Admit Student",
            url: "admit-Students",
          },
          {
            title: "Admit Bulk Student",
            url: "#",
          },
        ],
      },
      {
        title: "Students Mangement",
        url: "#",
        icon: SquareTerminal,
        isActive: false,
        items: [
          {
            title: "Find Single Student",
            url: "#",
          },
          {
            title: "All Students List",
            url: "all-students",
          },
        ],
      },
      {
        title: "Teacher Mangement",
        url: "#",
        icon: SquareTerminal,
        isActive: false,
        items: [
          {
            title: "Add New Teacher",
            url: "add-new-teacher",
          },
          {
            title: "View All Teacher",
            url: "view-all-teachers",
          },
          {
            title: "Find Single Teacher",
            url: "#",
          },
          {
            title: "Asign Class",
            url: "class-asign-to-teacher",
          },
          {
            title: "View Teacher  Schedule",
            url: "",
          },
        ],
      },
      {
        title: "Student Attendance ",
        url: "#",
        icon: SquareTerminal,
        isActive: false,
        items: [
          {
            title: "Manual Attandance",
            url: "",
          },
          {
            title: "Digital Attendance",
            url: "",
          },
          {
            title: "View All Student Attendance",
            url: "",
          },
        ],
      },
      {
        title: "Teachers Attendance ",
        url: "#",
        icon: SquareTerminal,
        isActive: false,
        items: [
          {
            title: "Manual Attandance",
            url: "",
          },
          {
            title: "Digital Attendance",
            url: "",
          },
          {
            title: "View All Teachers Attendance",
            url: "",
          },
        ],
      },
      {
        title: "TimeTable Mangement",
        url: "#",
        icon: SquareTerminal,
        isActive: false,
        items: [
          {
            title: "Create Classes Time Table",
            url: "",
          },
          {
            title: "View All Classes Time Table",
            url: "",
          },
          {
            title: "Create teachers Time Table",
            url: "#",
          },
          {
            title: "View All teachers Time Table",
            url: "",
          },
        ],
      },
      {
        title: "Classes Mangement",
        url: "#",
        icon: SquareTerminal,
        isActive: false,
        items: [
          {
            title: "Create Classes ",
            url: "create-classes",
          },
          {
            title: "View All Classes",
            url: "view-all-classes",
          },
        ],
      },
      {
        title: "subject Mangement",
        url: "#",
        icon: SquareTerminal,
        isActive: false,
        items: [
          {
            title: "Create Subject",
            url: "add-subject",
          },
          {
            title: "Subject",
            url: "",
          },
        ],
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        icon: Map,
      },
    ],
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
