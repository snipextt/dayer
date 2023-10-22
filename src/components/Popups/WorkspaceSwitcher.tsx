import {
  useAuth,
  useOrganization,
  useOrganizationList,
  useUser,
} from "@clerk/clerk-react";
import {
  Avatar,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";

import IconWrapper from "@/components/ui/IconWrapper";
import {
  ArrowRightIcon,
  GearIcon,
  PlusIcon,
  ExitIcon,
} from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

const WorkspaceIcon = {
  1: <GearIcon />,
  0: <ArrowRightIcon />,
};

const getWorkspaceIcon = (predicate: boolean) => {
  if (predicate) return WorkspaceIcon[1];
  return WorkspaceIcon[0];
};

export const WorkspaceSwitcher = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();
  const navigate = useNavigate();

  const navigateToOnboarding = () => {
    navigate("/onboarding");
  };

  const switchOrganization = (id: string) => {
    if (!setActive || id === organization?.id) return;
    setActive({
      organization: id,
    });
  };

  return (
    <Popover placement="bottom" color="secondary">
      <PopoverTrigger>
        <div className="flex items-center gap-4 cursor-pointer hover:bg-secondary py-2 px-3 rounded-lg">
          <div className="name-section">
            <h4 className="text-sm">
              {organization?.name ||
                (user?.firstName || "") + " " + (user?.lastName || "")}
            </h4>
            <p className="text-xs text-gray-500">Current Workspace</p>
          </div>
          <Avatar size="sm" src={organization?.imageUrl || user?.imageUrl} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="px-2">
        <div className="w-72">
          {user?.organizationMemberships?.length && (
            <h3 className="px-2 py-3 text-foreground">Your Teams</h3>
          )}
          <Divider />
          {user?.organizationMemberships?.map((membership) => (
            <div
              key={membership.id}
              className={`flex w-full justify-between items-center gap-4 ${
                membership.organization.id === organization?.id
                  ? ""
                  : "cursor-pointer"
              } py-3 px-2 rounded-lg`}
              onClick={() => switchOrganization(membership.organization.id)}
            >
              <div className="flex gap-2">
                <Avatar size="sm" src={membership.organization.imageUrl} />
                <div className="name-section">
                  <h4 className="text-sm">{membership.organization.name}</h4>

                  <p className="text-xs text-gray-500">
                    {membership.organization.id === organization?.id
                      ? "Current Workspace"
                      : "1 Unread Notification"}
                  </p>
                </div>
              </div>
              <IconWrapper
                children={getWorkspaceIcon(
                  membership.organization.id === organization?.id,
                )}
              />
            </div>
          ))}
          <h3 className="px-2 py-3 text-foreground">Personal Space</h3>
          <Divider />
          <div
            key={user?.id}
            className="flex w-full justify-between items-center gap-4 cursor-pointer hover:bg-secondary py-3 px-2 rounded-lg"
            onClick={() => switchOrganization("")}
          >
            <div className="flex gap-2">
              <Avatar size="sm" src={user?.imageUrl} />
              <div className="name-section">
                <h4 className="text-sm">
                  {(user?.firstName || "") + " " + (user?.lastName || "")}
                </h4>
                <p className="text-xs text-gray-500">
                  {!organization
                    ? "Current Workspace"
                    : "1 Unread Notification"}
                </p>
              </div>
            </div>
            <IconWrapper children={getWorkspaceIcon(!organization)} />
          </div>
        </div>
        <Divider />
        <div
          onClick={navigateToOnboarding}
          className="flex w-full justify-between items-center gap-4 cursor-pointer hover:bg-secondary py-3 px-2 rounded-lg"
        >
          <h3 className="text-foreground">Create Workspace</h3>
          <IconWrapper children={<PlusIcon />} />
        </div>
        <Divider />
        <div
          onClick={() => signOut()}
          className="flex w-full justify-between items-center gap-4 cursor-pointer hover:bg-secondary py-3 px-2 rounded-lg text-foreground"
        >
          <h3 className="text-foreground">Logout</h3>
          <IconWrapper children={<ExitIcon />} />
        </div>
      </PopoverContent>
    </Popover>
  );
};
