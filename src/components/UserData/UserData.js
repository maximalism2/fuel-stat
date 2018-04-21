// @flow
import { h, Component } from "preact";
import classnames from "classnames";
import moment from "moment";
import style from "./style";

window.moment = moment;

type UserDataProps = {
  loading: boolean,
  loggedIn: boolean,
  navOpen: boolean,
  id?: string,
  displayName?: string,
  photoUrl?: string,
  createdAt?: string
};

export default (props: UserDataProps) => {
  const { displayName, photoUrl, createdAt } = props;
  const onSiteAlready = moment(Number(createdAt)).format("LL");

  const userDataCN = classnames({
    [style.userData]: true,
    [style.userData_navOpen]: props.navOpen
  });

  const textWrapperCN = classnames({
    [style.userData__textWrapper]: true,
    [style.userData__textWrapper_hidden]: props.navOpen === false
  });

  return (
    <section class={userDataCN}>
      <img
        src={photoUrl}
        alt={displayName}
        class={style.userData__profilePicture}
      />
      <div class={textWrapperCN}>
        <h3 class={style.userData__displayName}>{displayName}</h3>
        <p class={style.userData__createdAt}>Using since: {onSiteAlready}</p>
      </div>
    </section>
  );
};
