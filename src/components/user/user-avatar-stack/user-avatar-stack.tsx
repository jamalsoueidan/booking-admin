import { Avatar, AvatarProps } from "@shopify/polaris";
import { useMemo } from "react";
import styled from "styled-components";
import { User } from "~/api/model";
import { HelperArray } from "~/helpers/helper-array";

export type UserAvatarStackProps = {
  users: User[];
  size: AvatarProps["size"];
  align?: "left" | "right";
};

const DEFAULT_SIZE: AvatarProps["size"] = "medium";

export const UserAvatarStack = ({
  users,
  size = DEFAULT_SIZE,
  align = "left",
}: UserAvatarStackProps) => {
  const userMarkup = useMemo(
    () =>
      [...users]
        .sort(HelperArray.sortByText((d) => d.fullname))
        .map(({ _id, fullname, avatar }) => (
          <UserAvatarItemStyled
            key={_id}
            size={size}
            length={users.length}
            align={align}
          >
            <Avatar customer size={size} name={fullname} source={avatar} />
          </UserAvatarItemStyled>
        )),
    [align, size, users]
  );

  return (
    <UserAvatarStackStyled size={size} align={align}>
      {userMarkup}
    </UserAvatarStackStyled>
  );
};

const sizes: Record<string, string[]> = {
  extraSmall: ["1.5", "0.5"],
  large: ["3.75", "1.5"],
  medium: ["2.5", "1"],
  small: ["2", "0.75"],
};

type StyledAvatarItemStyledProps = {
  size: string;
  length: number;
  align: string;
};

const UserAvatarStackStyled = styled.div<
  Pick<StyledAvatarItemStyledProps, "size" | "align">
>`
  display: flex;
  flex: 1;
  list-style-type: none;
  margin: auto;
  padding: 0px;
  flex-direction: row;
  justify-content: ${(props) => (props.align === "right" ? "end" : "start")};
  padding-right: ${(props) => `${sizes[props.size][1]}rem`};
`;

// https://codepen.io/landrik/pen/pGVJbq
const UserAvatarItemStyled = styled.div<StyledAvatarItemStyledProps>`
  border: 2px solid #fff;
  border-radius: 100%;
  display: block;
  height: ${(props) => `${sizes[props.size][0]}rem`};
  width: ${(props) => `${sizes[props.size][0]}rem`};
  text-align: center;
  overflow: hidden;
  margin-right: -${(props) => `${sizes[props.size][1]}rem`};

  ${(props) => getIndex(props)}
`;

const getIndex = (props: StyledAvatarItemStyledProps) => {
  let str = "";
  for (let index = props.length; index > 0; index -= 1) {
    str += `
       &:nth-child(${index}) {
        z-index: ${props.length - index};
       }
    `;
  }
  return str;
};
