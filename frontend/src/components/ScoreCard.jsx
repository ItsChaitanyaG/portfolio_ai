const SkillGroup = ({ title, items, good }) => {
    if (items.length === 0) return null;

    const style = good
        ? "border-[#9dff4f]/60 bg-[#9dff4f]/10 text-[#9dff4f]"
        : "border-red-400/50 bg-red-400/10 text-red-300";

    return (
        <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/50">
                {title}
            </h3>
            <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                    <span key={skill} className={`rounded-lg border px-3 py-1 text-xs font-medium ${style}`}>
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
};

const ScoreCard = ({ result }) => {
    const details = result.details ?? {};
    const pct = Math.max(0, Math.min(100, Math.round(result.score ?? 0)));

    // green for a strong match, yellow for medium, red for weak
    const color = pct >= 70 ? "#9dff4f" : pct >= 40 ? "#facc15" : "#f87171";

    return (
        <div className="space-y-5 rounded-2xl border border-white/10 bg-[#18191c]/90 p-5 shadow-2xl backdrop-blur">
            {/* Score */}
            <div>
                <div className="flex items-end justify-between">
                    <span className="text-sm text-white/60">Match score</span>
                    <span className="text-4xl font-extrabold" style={{ color }}>
                        {pct}%
                    </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, backgroundColor: color, boxShadow: `0 0 12px ${color}` }}
                    />
                </div>
            </div>

            {/* Skills */}
            <SkillGroup title="Matching skills" items={details.matching_skills ?? []} good />
            <SkillGroup title="Missing skills" items={details.missing_skills ?? []} good={false} />

            {/* Experience */}
            {typeof details.experience_met === "boolean" && (
                <p className="text-sm">
                    <span className="text-white/50">Experience requirement: </span>
                    <span className={details.experience_met ? "text-[#9dff4f]" : "text-red-300"}>
                        {details.experience_met ? "Met" : "Not met"}
                    </span>
                </p>
            )}

            {/* Verdict */}
            {details.verdict && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-slate-200">
                    {details.verdict}
                </div>
            )}
        </div>
    );
};

export default ScoreCard;