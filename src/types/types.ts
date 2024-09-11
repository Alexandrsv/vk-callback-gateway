export type CallbackEvent =
  | ConfirmationCallbackEvent
  | GroupLeaveEvent
  | GroupJoinEvent;

export type GroupJoinEvent = {
  group_id: number;
  type: "group_join";
  event_id: string;
  v: string;
  object: {
    user_id: number;
    join_type: string;
  };
};

export type GroupLeaveEvent = {
  group_id: number;
  type: "group_leave";
  event_id: string;
  v: string;
  object: {
    user_id: number;
    self: number;
  };
};

export type ConfirmationCallbackEvent = {
  group_id: number;
  event_id: string;
  v: string;
  type: "confirmation";
};
