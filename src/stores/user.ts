import { derived, type Readable } from 'svelte/store';
import type { UserId } from '../types/app';
import gql from '../utilities/gql';
import { gqlSubscribable } from './subscribable';

/* Constants. */
// Default PlanDev database roles.
// See https://github.com/NASA-AMMOS/plandev/blob/develop/merlin-server/sql/merlin/default_user_roles.sql
// for a description of these roles.
export const PLANDEV_DEFAULT_USERS: UserId[] = ['Mission Model', 'PlanDev Legacy'];

/* Subscriptions. */

export const users = gqlSubscribable<UserId[] | null>(gql.SUB_USERS, {}, null, null, users =>
  // Filter out PlanDev default users as they should not be viewable by UI users
  users
    .filter((user: { default_role: string; username: UserId }) => PLANDEV_DEFAULT_USERS.indexOf(user.username) < 0)
    .map((user: { default_role: string; username: UserId }) => user.username),
);

/* Loading stores. */
export const initialUsersLoading: Readable<boolean> = derived([users], ([$users]) => !$users);
