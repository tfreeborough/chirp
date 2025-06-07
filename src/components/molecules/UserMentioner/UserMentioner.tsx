import { observer } from "mobx-react-lite";
import { AppContext } from "../../../store/AppContext.ts";
import type { User } from "../../../types/User.types.ts";
import { useContext, useEffect, useRef, useState } from "react";
import css from "./UserMentioner.module.css";
import john from "./john.gif";
import { useClickOutsideRef } from "../../../utils/useClickOutsideRef.ts";

interface UserMentionerProps {
    search: string;
    onSelect: (user: User) => void;
    position: { x: number; y: number };
    onClose: () => void;
}

export const UserMentioner = observer(
    ({ search, onSelect, position, onClose }: UserMentionerProps) => {
        const { UserStore } = useContext(AppContext);

        const [filtered, setFiltered] = useState<User[]>([]);

        const ref = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const filtered = UserStore.users.filter((mention) =>
                mention.username.toLowerCase().includes(search.toLowerCase()),
            );
            setFiltered(filtered);
        }, [search, UserStore.users]);

        function handleSelect(user: User) {
            onSelect(user);
        }

        function handleKeyDown(
            e: React.KeyboardEvent<HTMLDivElement>,
            user: User,
        ) {
            if (e.key === "Enter") {
                handleSelect(user);
            }
            if (e.key === "Escape") {
                onClose();
            }
        }

        useClickOutsideRef(ref, () => {
            onClose();
        });

        if (search.length <= 2) {
            return (
                <div
                    ref={ref}
                    className={`${css.userMentioner} p-3 rounded shadow`}
                    style={{
                        left: position.x,
                        top: position.y,
                    }}
                >
                    <div className="p-4 text-gray-600 text-xs flex flex-col items-center gap-4">
                        Keep typing to see users suggestions
                    </div>
                </div>
            );
        }

        return (
            <div
                data-testid="user-mentioner"
                ref={ref}
                className={`${css.userMentioner} rounded shadow`}
                style={{
                    left: position.x,
                    top: position.y,
                }}
            >
                {filtered.length === 0 && (
                    <div className="p-4 text-gray-600 text-xs flex flex-col items-center gap-4">
                        <img src={john} style={{ width: 48 }} />
                        There are no users matching your search!
                    </div>
                )}
                <div className="flex flex-col">
                    {filtered.slice(0, 5).map((mention) => (
                        <div
                            tabIndex={0}
                            key={mention.username}
                            className="
                            flex px-2 py-1 gap-2 text-sm border-white border-1 outline-0 text-gray-600
                            focus:border-stone-200   focus:text-gray-800 focus:text focus:bg-stone-50
                            hover:cursor-pointer hover:text-gray-800 hover:text hover:border-stone-200
                            "
                            onClick={() => handleSelect(mention)}
                            onKeyDown={(e) => handleKeyDown(e, mention)}
                        >
                            <span className="capitalize">
                                {mention.first_name} {mention.last_name}
                            </span>
                            <span className="text-red-400 focus:text-red-600">
                                ({mention.username})
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    },
);
