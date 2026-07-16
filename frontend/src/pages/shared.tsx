export const Avatar = ({
  name,
  email,
  avatarUrl,
  subtitle,
}: {
  name: string;
  email?: string;
  avatarUrl?: string;
  subtitle?: string;
}) => {
  return (
    <div className="flex items-center gap-3">
      <img
        alt={name}
        className="h-11 w-11 rounded-2xl border border-slate-200 bg-slate-100 object-cover dark:border-slate-800"
        src={avatarUrl ?? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`}
      />
      <div>
        <div className="font-medium text-slate-950 dark:text-white">{name}</div>
        <div className="text-xs text-slate-500 dark:text-slate-400">{subtitle ?? email}</div>
      </div>
    </div>
  );
};
