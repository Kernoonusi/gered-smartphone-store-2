import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { router } from '@inertiajs/react';
import { toast } from 'sonner';
import { useLaravelReactI18n } from 'laravel-react-i18n';

interface OrderReviewFormProps {
  orderId: number;
  initialReview?: string;
  initialRating?: number;
  disabled?: boolean;
  errorMessage?: string;
}

export function OrderReviewForm({ orderId, initialReview = '', initialRating = 0, disabled = false, errorMessage }: OrderReviewFormProps) {
  const [review, setReview] = useState(initialReview);
  const [rating, setRating] = useState(initialRating);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ review?: string; rating?: string } | null>(null);
  const { t } = useLaravelReactI18n();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors(null);
    router.post(`/orders/${orderId}/review`, { review, rating }, {
      onSuccess: () => {
        toast.success(t('profile.review_success'));
      },
      onError: () => {
        toast.error(t('profile.review_error'));
      },
      onFinish: () => setSubmitting(false),
    });
  };

  if (disabled) {
    // Показываем уже оставленный отзыв
    return (
      <div className="mt-2 p-3 rounded bg-muted/20 border">
        <div className="flex gap-1 mb-1">
          {[1,2,3,4,5].map((star) => (
            <Star key={star} className="w-5 h-5" fill={star <= initialRating ? '#facc15' : 'none'} color={star <= initialRating ? '#facc15' : '#d1d5db'} />
          ))}
        </div>
        <div className="text-sm text-muted-foreground mb-1">{t('profile.your_review')}</div>
        <div>{initialReview}</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-2">
      <div className="flex gap-1 items-center">
        {[1,2,3,4,5].map((star) => (
          <button
            key={star}
            type="button"
            className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}
            onClick={() => setRating(star)}
            disabled={disabled || submitting}
            aria-label={t('profile.rate_star', { star })}
          >
            <Star className="w-5 h-5" fill={star <= rating ? '#facc15' : 'none'} />
          </button>
        ))}
      </div>
      {errors?.rating && <div className="text-xs text-red-500">{errors.rating}</div>}
      <Textarea
        value={review}
        onChange={e => setReview(e.target.value)}
        placeholder={t('profile.your_review')}
        rows={3}
        disabled={disabled || submitting}
        required
      />
      {errors?.review && <div className="text-xs text-red-500">{errors.review}</div>}
      <Button type="submit" disabled={disabled || submitting || rating === 0}>
        {submitting ? t('profile.sending') : t('profile.leave_review')}
      </Button>
      {errorMessage && <div className="text-xs text-red-500">{errorMessage}</div>}
    </form>
  );
}
